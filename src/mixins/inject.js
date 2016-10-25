function resolveDependency(key, vm) {
    if (key in vm.$options) {
        return vm.$options[key];
    }

    if (vm.$options.parent) {
        return resolveDependency(key, vm.$options.parent);
    }

    throw new Error(`Dependency \`${key}\` couldn't be resolved`);
}

const inject = (...keys) => ({
    created() {
        keys.forEach(key => this[`$${key}`] = resolveDependency(key, this), this);
    },
});

export default inject;

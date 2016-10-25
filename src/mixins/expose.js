const expose = (mapper) => ({
    created() {
        this.$exposes = mapper(this);
    },
});

export default expose;

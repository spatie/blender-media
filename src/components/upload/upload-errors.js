export default {

    template: `
        <div>
            <div v-if="hasError">
                <span @click="clearErrors(collection)">
                    {{ error }}
                </span>
            </div>
        </div>
    `,

    props: ['collection'],

    vuex: {
        getters: {
            allErrors: state => state.errors.errors,
        },
        actions: {
            clearErrors: ({ dispatch }, collection) => dispatch('CLEAR_ERRORS', collection),
        },
    },

    computed: {
        error() {
            return this.allErrors[this.collection] || '';
        },
        hasError() {
            return !! this.error;
        },
    },

};

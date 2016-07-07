export default {

    template: `
        <div
            v-if="hasError"
            class="media__alert -error"
        >
            <div class="media__alert__message" >
                {{ error }}
            </div>

            <a
                href="#"
                class="media__alert__delete"
                @click.prevent="clearErrors(collection)"
            >
                <i class="fa fa-remove"></i>
            </a>
        </div>
    `,

    props: ['collection'],

    methods: {
        clearErrors(collection) {
            this.$store.dispatch('clearErrors', { collection });
        },
    },

    computed: {
        error() {
            return this.$store.getters.allErrors[this.collection] || '';
        },
        hasError() {
            return !! this.error;
        },
    },

};

import { clearErrors, state } from '../../store';

export default {

    template: `
        <div v-if="hasError">
            <span @click="clearErrors">
                {{ error }}
            </span>
        </div>
    `,

    props: ['collection'],

    computed: {
        error() {

            if (!state.errors.hasOwnProperty(this.collection)) {
                return '';
            }

            return state.errors[this.collection];
        },
        hasError() {
            return !! this.error;
        },
    },

    methods: {
        clearErrors() {
            clearErrors(this.collection);
        },
    },

};

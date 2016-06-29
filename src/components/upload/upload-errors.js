import { allErrors } from '../../getters';
import { clearErrors } from '../../actions';

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
                @click="clearErrors(collection)"
            >
                <i class="fa fa-remove"></i>
            </a>
        </div>
    `,

    props: ['collection'],

    vuex: {
        getters: {
            allErrors,
        },
        actions: {
            clearErrors,
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

import { debug } from '../../helpers';

export default {

    template: `
        <div>
            <textarea
                :name="name"
                :value="exportableData"
                class="export"
                :class="{ '-debug': debug }"
            ></textarea>
        </div>
    `,

    props: ['name', 'data'],

    computed: {
        exportableData() {
            if (debug) {
                return JSON.stringify(this.data, null, '\t');
            }

            return JSON.stringify(this.data);
        },
    },

};

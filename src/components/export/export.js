import { debug } from '../../lib/helpers';

export default {

    template: `
        <div>
            <textarea
                :name="collection"
                :value="data"
                :class="['export', { '-debug': debug }]"
                style="width: 50vh; height: 50vh"
            ></textarea>
        </div>
    `,

    props: ['collection', 'media'],

    computed: {
        data() {
            if (debug) {
                return JSON.stringify(this.media, null, '\t');
            }

            return JSON.stringify(this.media);
        },
    },

};

export default {

    template: `
        <div v-show="debug">
            <textarea
                :name="collection"
                :value="data"
                :style="{ width: '100%', height: '300px' }"
            ></textarea>
        </div>
    `,

    props: ['collection', 'media', 'debug'],

    computed: {
        data() {
            if (this.debug) {
                return JSON.stringify(this.media, null, '\t');
            }

            return JSON.stringify(this.media);
        },
    },

};

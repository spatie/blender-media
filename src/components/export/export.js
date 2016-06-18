export default {

    template: `
        <div v-show="false">
            <textarea
                :name="collection"
                :value="data"
                :style="{ width: '100%', height: '300px' }"
            ></textarea>
        </div>
    `,

    props: ['collection', 'media'],

    computed: {
        data() {
            return JSON.stringify(this.media);
        },
    },

};

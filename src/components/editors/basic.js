export default {

    template: `
        <div>
            <input v-model="name" />
        </div>
    `,

    props: ['media'],

    vuex: {
        actions: {
            updateMedia: ({ dispatch }, media, prop, value) => {
                dispatch('UPDATE_MEDIA', media, prop, value);
            },
        },
    },

    computed: {
        name: {
            get() {
                return this.media.name;
            },
            set(value) {
                this.updateMedia(this.media, 'name', value);
            },
        },
    },

};

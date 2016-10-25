export default {

    props: ['media', 'data'],

    computed: {
        name: {
            get() {
                return this.media.name;
            },
            set(value) {
                this.rename(value);
            },
        },
    },

    methods: {
        rename(name) {
            this.$store.commit('renameMedia', { id: this.media.id, name });
        },
        updateCustomProperty(property, value) {
            this.$store.commit(
                'updateCustomProperty',
                { id: this.media.id, property, value }
            );
        },
        customProperty(name, fallback = null) {
            return this.media.customProperties[name] || fallback;
        },
    },

};

export default {

    props: ['media', 'data'],

    vuex: {
        actions: {
            renameMedia: ({ dispatch }, media, name) => {
                dispatch('RENAME_MEDIA', media, name);
            },
            updateMediaCustomProperty: ({ dispatch }, media, property, value) => {
                dispatch('UPDATE_CUSTOM_PROPERTY', media, property, value);
            },
        },
    },

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
            this.renameMedia(this.media, name);
        },
        updateCustomProperty(property, value) {
            this.updateMediaCustomProperty(this.media, property, value);
        },
        customProperty(name, fallback = null) {
            return this.media.custom_properties[name] || fallback;
        },
    },

};

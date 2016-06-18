export default {
 
    vuex: {
        actions: {
            dispatchRename: ({ dispatch }, media, name) => {
                dispatch('RENAME_MEDIA', media, name);
            },
            dispatchUpdateCustomProperty: ({ dispatch }, media, property, value) => {
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
            this.dispatchRename(this.media, name);
        },
        updateCustomProperty(property, value) {
            this.dispatchUpdateCustomProperty(this.media, property, value);
        },
    },

};

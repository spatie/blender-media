import { renameMedia, updateMediaCustomProperty } from '../../actions';

export default {

    props: ['media', 'data'],

    vuex: {
        actions: {
            renameMedia,
            updateMediaCustomProperty,
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
            return this.media.customProperties[name] || fallback;
        },
    },

};

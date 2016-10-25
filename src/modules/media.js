import { findOrFail } from '../util';
import { forIn } from 'lodash';

export default {

    data() {
        return {
            media: [],
        };
    },

    methods: {
        find(id) {
            return findOrFail(this.media, { id });
        },

        addMedia(media) {
            if (! Array.isArray(media)) {
                media = [media];
            }

            this.media = this.media.concat(
                media.map(m => ({ ...m, markedForRemoval: false }))
            );
        },

        markAllMediaForRemoval() {
            this.media.forEach((media) => {
                this.markMediaForRemoval(media.id);
            });
        },

        markMediaForRemoval(id) {
            this.find(id).markedForRemoval = true;
        },

        restoreMedia(id) {
            this.find(id).markedForRemoval = false;
        },

        replaceMedia(media) {
            if (! Array.isArray(media)) {
                media = [media];
            }

            this.media = media;
        },

        setNewOrder(order) {
            forIn(order, (order, mediaId) => {
                this.find(parseInt(mediaId)).orderColumn = order;
            });
        },

        updateCustomProperty(id, property, value) {
            const media = this.find(id);
            const [namespace, key] = property.split('.');

            if (! key) {
                media.customProperties[namespace] = value;
                return;
            }

            if (! media.customProperties[namespace]) {
                media.customProperties[namespace] = {};
            }

            media.customProperties[namespace][key] = value;
        },
    },
};

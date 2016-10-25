import { findOrFail } from '../util';
import { forIn } from 'lodash';
import Vue from 'vue';

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

            this.media = this.media
                .filter(m => m.id === media.id)
                .concat(media.map(m => ({ ...m, markedForRemoval: false })));
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
            this.media = [media];
        },

        setMediaOrder(order) {
            forIn(order, (order, mediaId) => {
                this.find(parseInt(mediaId)).orderColumn = order;
            });
        },

        renameMedia(id, name) {
            this.find(id).name = name;
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

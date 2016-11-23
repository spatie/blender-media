import { findOrFail } from './util';
import { forIn } from 'lodash';
import Vue from 'vue';

const Store = {

    data() {
        return {
            media: [],
            uploads: [],
            error: '',
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
                // If there's no key, the namespace variable holds the key instead
                this.$set(media.customProperties, namespace, value);
                return;
            }

            if (! media.customProperties.hasOwnProperty(namespace)) {
                this.$set(media.customProperties, namespace, {});
            }

            this.$set(media.customProperties[namespace], key, value);
        },

        startUpload(id, name) {
            this.uploads.push({ id, name, progress: 0 });
        },

        updateUploadProgress(id, progress) {
            const upload = this.uploads.filter(upload => upload.id === id)[0];

            if (! upload) {
                return;
            }

            upload.progress = progress;
        },

        finishUpload(id) {
            this.uploads = this.uploads.filter(upload => upload.id !== id);
        },

        setError(message) {
            this.error = message;
        },

        clearError() {
            this.error = '';
        },
    },
};

export default function createStore() {
    return new Vue(Store);
}
import { findOrFail, pipe } from './util';
import { forIn, sortBy } from 'lodash';
import { getTypeSettings } from './settings/types';
import Vue from 'vue';

const Store = {

    data() {
        return {
            collection: '',
            type: '',
            uploadUrl: '',
            model: {},
            data: {},
            media: [],
            uploads: [],
            error: '',
        };
    },

    computed: {
        hasMedia() {
            return this.media.length > 0;
        },

        hasActiveMedia() {
            return this.media.filter(media => media.markedForRemoval !== true).length > 0;
        },

        hasUploads() {
            return this.uploads.length > 0;
        },

        isEmpty() {
            return ! this.hasMedia && ! this.hasUploads;
        },

        canBeCleared() {
            if (! this.hasActiveMedia) {
                return false;
            }
            
            return this.settings.multiple;
        },

        settings() {
            return getTypeSettings(this.type);
        },

        export() {
            return pipe(
                this.media,
                media => media.filter(media => ! media.markedForRemoval),
                media => sortBy(media, 'orderColumn'),
                media => JSON.stringify(media)
            );
        },
    },

    methods: {
        init({ collection, type, uploadUrl, model, initial, data }) {
            this.collection = collection;
            this.type = type;
            this.uploadUrl = uploadUrl;
            this.model = model;
            this.data = data;

            this.addMedia(initial);
        },

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
                media.markedForRemoval = true;
            });
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
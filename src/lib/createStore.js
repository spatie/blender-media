import { findOrFail, pipe } from './util';
import { find, forIn, isArray, reject, sortBy } from 'lodash';
import { getTypeSettings } from '../settings/types';
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
            debug: false,
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
        init({ collection, type, uploadUrl, model, initial, data, debug }) {
            this.collection = collection;
            this.type = type;
            this.uploadUrl = uploadUrl;
            this.model = model;
            this.data = data;
            this.debug = debug;

            this.addMedia(initial);
        },

        find(id) {
            return findOrFail(this.media, { id });
        },

        addMedia(media) {
            if (! Array.isArray(media)) {
                media = [media];
            }
            
            // Sometimes media items are added twice during multiple uploads,
            // so want to reject media items that are already in the store.
            media = 
                reject(media, m => find(this.media, { id: m.id }))
                    .map(this.normalizeMedia);

            this.media = [...this.media, ...media];
        },

        normalizeMedia(media) {
            return {
                ...media,
                markedForRemoval: false,
                customProperties: isArray(media.customProperties) ?
                    {} : media.customProperties,
            };
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

export default function createStore(options = null) {
    const store = new Vue(Store);
    
    if (options) {
        store.init(options);
    }

    return store;
}
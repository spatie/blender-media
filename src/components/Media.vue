<template>
    <upload
        class="media"
        :accepts="settings.accepts"
        :collection="collection"
        :model="model"
        :multiple="settings.multiple"
        :uploadUrl="uploadUrl"
        @started="startUpload"
        @progress="updateUploadProgress"
        @uploaded="handleUploadedMedia"
        @finished="finishUpload"
        @error="setError"
    >
        <media-table
            v-if="hasMedia"
            :media="media"
            :data="data"
            :settings="settings"
            @reordered="setNewOrder"
        ></media-table>
        <upload-table
            v-if="hasUploads"
            :uploads="uploads"
        ></upload-table>
        <no-media
            v-if="isEmpty"
        ></no-media>
        <error-message
            :text="error"
            @clear-error="clearError"
        ></error-message>
        <actions
            :allow-multiple="settings.multiple"
            :can-be-cleared="canBeCleared"
            :is-empty="isEmpty"
            :debug="debug"
            :export="media"
            @markAllForRemoval="markAllForRemoval"
        ></actions>
    </upload>
</template>

<script>
import { findOrFail } from '../lib/util';
import { find, forIn, isArray, reject } from 'lodash';
import { getTypeSettings } from '../settings/types';
import configuration from './configuration';

import Actions from './actions/actions';
import ErrorMessage from './ui/ErrorMessage';
import MediaTable from './media/MediaTable';
import NoMedia from './ui/NoMedia';
import Upload from './upload/Upload';
import UploadTable from './upload/UploadTable';

export default {

    props: {
        ...configuration,
        value: {
            required: true,
            type: Array,
        },
    },

    data() {
        return {
            uploads: [],
            error: '',
        };
    },

    components: {
        Actions,
        ErrorMessage,
        MediaTable,
        NoMedia,
        Upload,
        UploadTable,
    },

    created() {
        // Handle all nested value changes .This is not ideal since media 
        // properties both get mutated and rewritten For now it works, to be
        // refactored later. (Solution: rows & editors shouldn't bind to the 
        // value but emit events)
        this.$watch('value', this.handleChange, { deep: true });
    },

    computed: {
        media() {
            return this.value;
        },

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
    },

    methods: {
        handleChange(value) {
            this.$emit('input', value);
        },
        
        find(id) {
            return findOrFail(this.media, { id });
        },

        addMedia(media) {
            if (! isArray(media)) {
                media = [media];
            }

            if (! this.settings.multiple) {
                this.handleChange(media);
                return;
            }
            
            // Sometimes media items are added twice during multiple uploads,
            // so want to reject media items that are already in the 
            media = reject(media, m => find(this.media, { id: m.id }));

            this.handleChange([...this.value, ...media]);
        },

        markAllForRemoval() {
            this.media.forEach((media) => {
                media.markedForRemoval = true;
            });
        },

        replaceMedia(media) {
            if (! isArray(media)) {
                media = [media];
            }

            this.media = media;
        },

        setNewOrder({ order }) {
            forIn(order, (order, mediaId) => {
                this.find(parseInt(mediaId)).orderColumn = order;
            });
        },

        startUpload({ id, name }) {
            this.clearError();
            this.uploads.push({ id, name, progress: 0 });
        },

        updateUploadProgress({ id, progress }) {
            const upload = this.uploads.filter(upload => upload.id === id)[0];

            if (! upload) {
                return;
            }

            upload.progress = progress;
        },

        handleUploadedMedia({ media }) {
            this.addMedia(media);
        },

        finishUpload({ id }) {
            this.uploads = this.uploads.filter(upload => upload.id !== id);
        },

        setError({ error: message }) {
            this.error = error;
        },

        clearError() {
            this.error = '';
        },
    },
};
</script>

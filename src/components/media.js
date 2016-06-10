import * as store from '../store';
import Dropzone from 'dropzone';
import Export from './export/export';
import { getError } from '../lib/helpers';
import { getSettings } from '../settings';
import { inCollection as mediaInCollection } from '../lib/media';
import MediaTable from './media/media-table';
import UploadErrors from './upload/upload-errors';
import { inCollection as uploadsInCollection } from '../lib/uploads';

export default {

    template: `
        <div class="media" v-el:media>
            <div v-if="hasMedia">
                <table
                    is="media-table"
                    :collection="collection"
                    :media="media"
                    :editor="settings.editor"
                ></table>
            </div>
            <div v-else>
                dataTables.infoEmpty
            </div>
            Uploads: {{ uploads.length }}
            <div v-show="canAddMedia">
                <span v-el:add-media>Add media</span>
            </div>
            <upload-errors :collection="collection"></upload-errors>
            <export
                :collection="collection"
                :media="media"
            ></export>
        </div>
    `,

    props: {
        collection: { required: true },
        type: { required: true },
        uploadUrl: { required: true },
        model: { required: true },
        initial: { default: [] },
    },

    components: {
        Export,
        MediaTable,
        UploadErrors,
    },

    data() {
        return {
            state: store.state,
        };
    },

    computed: {
        settings() {
            return getSettings(this.type);
        },
        media() {
            return mediaInCollection(this.state.media, this.collection);
        },
        hasMedia() {
            return this.media.length > 0;
        },
        canAddMedia() {

            if (this.settings.multiple) {
                return true;
            }

            return !this.hasMedia && !this.hasUploads;
        },
        uploads() {
            return uploadsInCollection(this.state.uploads, this.collection);
        },
        hasUploads() {
            return this.uploads.length > 0;
        },
    },

    ready() {
        store.hydrate({ media: this.initial });

        new Dropzone(this.$els.media, {
            url: this.uploadUrl,
            uploadMultiple: this.settings.multiple,
            acceptedFiles: this.settings.accepts,
            clickable: this.$els.addMedia,
            previewsContainer: false,
            previewTemplate: false,
            sending: this.sending,
            uploadprogress: this.progress,
            success: this.success,
            error: this.fail,
            complete: this.complete,
        });
    },

    methods: {
        sending(file, xhr, data) {
            file.collection = this.collection;
            data.append('collection_name', this.collection);
            data.append('model_name', this.model.name);
            data.append('model_id', this.model.id);
            store.clearErrors(this.collection);
            store.startUpload(file);
        },
        progress(file) {
            store.updateProgress(file);
        },
        success(file, response) {
            store.addMedia(response);
        },
        fail(file) {
            store.addError(this.collection, getError(file.xhr));
        },
        complete(file) {
            store.finishUpload(file);
        },
    },

};

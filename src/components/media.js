import * as store from '../store';
import Export from './export/export';
import { getSettings } from '../settings';
import { inCollection as mediaInCollection } from '../lib/media';
import MediaTable from './media/media-table';
import Upload from './upload/upload';
import UploadErrors from './upload/upload-errors';
import { inCollection as uploadsInCollection } from '../lib/uploads';

export default {

    template: `
        <div
            v-upload
            :collection="collection"
            :model="model"
            :url="uploadUrl"
            :multiple="settings.multiple"
            :accepts="settings.accepts"
        >
            <div v-if="hasMedia">
                <media-table
                    :collection="collection"
                    :media="media"
                    :editor="settings.editor"
                ></media-table>
            </div>
            <div v-else>
                dataTables.infoEmpty
            </div>
            Uploads: {{ uploads.length }}
            <div v-show="canAddMedia">
                <span @click="showUploadDialog">
                    Add media
                </span>
            </div>
            <upload-errors :collection="collection"></upload-errors>
            <export
                :collection="collection"
                :media="media"
                :debug="debug"
            ></export>
        </div>
    `,

    props: {
        collection: { required: true },
        type: { required: true },
        uploadUrl: { required: true },
        model: { required: true },
        initial: { default: [] },
        debug: { default: false },
    },

    components: {
        Export,
        MediaTable,
        UploadErrors,
    },

    directives: {
        Upload,
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

    methods: {
        showUploadDialog() {
            this.upload.hiddenFileInput.click();
        },
    },

    ready() {
        store.hydrate({ media: this.initial });
    },

};

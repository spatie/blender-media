import * as store from '../store';
import Export from './export/export';
import { getSettings } from '../settings';
import { inCollection as mediaInCollection } from '../lib/media';
import MediaTable from './media/media-table';
import uploader from './upload/uploader';
import UploadErrors from './upload/upload-errors';
import { inCollection as uploadsInCollection } from '../lib/uploads';

export default {

    template: `
        <div class="media" v-el:media>
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
                <span v-el:add-media>Add media</span>
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

    mixins: [uploader],

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

        this.initDropzone(this.$els.media, {
            collection: this.collection,
            model: this.model,
            url: this.uploadUrl,
            uploadMultiple: this.settings.multiple,
            acceptedFiles: this.settings.accepts,
            clickable: this.$els.addMedia,
        });
    },

};

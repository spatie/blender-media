import { allMedia, allUploads } from '../getters';
import { hydrate, markCollectionForRemoval } from '../actions';
import Export from './export/export';
import { getTypeOptions } from '../options/types';
import MediaTable from './media/media-table';
import store from '../store';
import translate from '../translations';
import Upload from './upload/upload';
import UploadErrors from './upload/upload-errors';
import UploadTable from './upload/upload-table';

export default {

    template: `
        <div
            class="media"
            v-upload
            :collection="collection"
            :model="model"
            :url="uploadUrl"
            :multiple="options.multiple"
            :accepts="options.accepts"
        >
            <div v-if="hasMedia">
                <media-table
                    :collection="collection"
                    :media="media"
                    :options="options"
                    :data="data"
                ></media-table>
            </div>
            <div v-if="hasUploads">
                <upload-table
                    :uploads="uploads"
                ></upload-table>
            </div>
            <div
                v-if="!hasMedia && !hasUploads"
                class="media__alert">
                {{ translate('noMedia') }}
            </div>
            <upload-errors :collection="collection"></upload-errors>
            <div class="media__actions">
                <button
                    class="media__button"
                    @click.prevent="showUploadDialog"
                >
                    {{ uploadButtonText }}
                </button>
                <button
                    v-if="options.multiple"
                    class="media__button--delete"
                    @click.prevent="markCollectionForRemoval(collection)"
                >
                    {{ translate('clearCollection') }}  <i class="fa fa-remove media__input--button--delete__icon"></i>
                </button>
            </div>
            <export
                :collection="collection"
                :media="mediaForExport"
            ></export>
        </div>
    `,

    props: {
        collection: { required: true },
        type: { required: true },
        uploadUrl: { required: true },
        model: { required: true },
        initial: { default: () => [] },
        data: { default: () => ({}) },
    },

    components: {
        Export,
        MediaTable,
        UploadErrors,
        UploadTable,
    },

    directives: {
        Upload,
    },

    store,

    vuex: {
        getters: {
            allMedia,
            allUploads,
        },
        actions: {
            hydrate,
            markCollectionForRemoval,
        },
    },

    computed: {
        options() {
            return getTypeOptions(this.type);
        },
        media() {
            return this.allMedia.filter(media => media.collection === this.collection);
        },
        mediaForExport() {
            return this.media.filter(media => !media.markedForRemoval);
        },
        hasMedia() {
            return this.media.length > 0;
        },
        uploads() {
            return this.allUploads.filter(upload => upload.collection === this.collection);
        },
        hasUploads() {
            return this.uploads.length > 0;
        },
        uploadButtonText() {
            if (this.options.multiple) {
                return translate('addMedia');
            }

            return (!this.hasMedia && !this.hasUploads) ?
                translate('addMedia') :
                translate('replaceMedia');
        },
    },

    methods: {
        translate,
        showUploadDialog() {
            this.upload.hiddenFileInput.click();
        },
    },

    ready() {
        this.hydrate({ media: this.initial });
    },

};

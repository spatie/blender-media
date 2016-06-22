import Export from './export/export';
import { getTypeOptions } from '../options/types';
import MediaTable from './media/media-table';
import store from '../store';
import translations from '../translations';
import Upload from './upload/upload';
import UploadErrors from './upload/upload-errors';
import { values } from 'lodash';

export default {

    template: `
        <div
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
                    :editor="options.editor"
                    :data="data"
                ></media-table>
            </div>
            <div v-else>
                {{ translate('noMedia') }}
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
        data: { default: {} },
    },

    mixins: [translations],

    components: {
        Export,
        MediaTable,
        UploadErrors,
    },

    directives: {
        Upload,
    },

    store,

    vuex: {
        getters: {
            allMedia: state => values(state.media.media),
            allUploads: state => values(state.uploads.uploads),
        },
        actions: {
            hydrate: ({ dispatch }, data) => dispatch('HYDRATE', data),
        },
    },

    computed: {
        options() {
            return getTypeOptions(this.type);
        },
        media() {
            return this.allMedia.filter(media => media.collection === this.collection);
        },
        hasMedia() {
            return this.media.length > 0;
        },
        canAddMedia() {

            if (this.options.multiple) {
                return true;
            }

            return !this.hasMedia && !this.hasUploads;
        },
        uploads() {
            return this.allUploads.filter(upload => upload.collection === this.collection);
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
        this.hydrate({ media: this.initial });
    },

};

<template>
    <div class="media">
        <upload
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
                v-if="isEmpty"
                class="media__alert">
                {{ translate('noMedia') }}
            </div>
            <upload-errors :collection="collection"></upload-errors>
            <div class="media__actions">
                <button
                    class="js-add-media media__button"
                    @click.prevent
                >
                    {{ uploadButtonText }}
                </button>
                <button
                    v-if="canBeCleared"
                    class="media__button--delete"
                    @click.prevent="markCollectionForRemoval(collection)"
                >
                    {{ translate('clearCollection') }}
                    <i class="fa fa-remove media__input--button--delete__icon"></i>
                </button>
            </div>
            <export
                :collection="collection"
                :media="media"
            ></export>
        </upload>
    </div>
</template>

<script>
import Export from './export/export';
import { getTypeOptions } from '../options/types';
import MediaTable from './media/media-table';
import store from '../store';
import translate from '../translations';
import Upload from './upload/upload';
import UploadErrors from './upload/upload-errors';
import UploadTable from './upload/upload-table';

export default {

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

    computed: {
        options() {
            return getTypeOptions(this.type);
        },
        media() {
            return this.$store.getters.allMedia.filter(media => media.collection === this.collection);
        },
        hasMedia() {
            return this.media.length > 0;
        },
        hasActiveMedia() {
            return this.media.filter(media => media.markedForRemoval !== true).length > 0;
        },
        uploads() {
            return this.$store.getters.allUploads.filter(upload => upload.collection === this.collection);
        },
        hasUploads() {
            return this.uploads.length > 0;
        },
        isEmpty() {
            return ! this.hasMedia && ! this.hasUploads;
        },
        uploadButtonText() {
            if (this.options.multiple) {
                return translate('addMedia');
            }
            return this.isEmpty ? translate('addMedia') : translate('replaceMedia');
        },
        canBeCleared() {
            if (! this.hasActiveMedia) {
                return false;
            }
            return this.options.multiple;
        },
    },

    methods: {
        translate,
        markCollectionForRemoval(collection) {
            return this.$store.dispatch('markCollectionForRemoval', { collection });
        },
    },

    ready() {
        this.$store.dispatch('addMedia', { media: this.initial });
    },

};
</script>

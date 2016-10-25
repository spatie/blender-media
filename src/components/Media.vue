<template>
    <div class="media">
        <upload
            :collection="collection"
            :model="model"
            :url="uploadUrl"
            :multiple="settings.multiple"
            :accepts="settings.accepts"
            :button="vm => vm.$refs.addMedia"
        >
            <div v-if="hasMedia">
                <media-table
                    :collection="collection"
                    :media="media"
                    :settings="settings"
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
            <upload-error></upload-error>
            <div class="media__actions">
                <button
                    class="media__button"
                    ref="addMedia"
                    @click.prevent
                >
                    {{ uploadButtonText }}
                </button>
                <button
                    v-if="canBeCleared"
                    class="media__button--delete"
                    @click.prevent="markAllMediaForRemoval({ collection })"
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
import Media from '../modules/Media';
import Uploads from '../modules/Uploads';
import Export from './export/export';
import inject from '../mixins/inject';
import expose from '../mixins/expose';
import { getTypeSettings } from '../settings/types';
import MediaTable from './media/MediaTable';
import translate from '../translations';
import Upload from './upload/upload';
import UploadError from './upload/UploadError';
import UploadTable from './upload/UploadTable';
import Vue from 'vue';

export default {

    props: {
        collection: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        uploadUrl: {
            type: String,
            required: true,
        },
        model: {
            type: Object,
            required: true,
        },
        initial: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Object,
            default: () => ({}),
        },
    },

    components: {
        Export,
        MediaTable,
        Upload,
        UploadError,
        UploadTable,
    },

    data() {
        return {
            mediaStore: new Vue(Media),
            uploadStore: new Vue(Uploads),
        };
    },

    mixins: [
        expose(vm => ({
            media: vm.mediaStore,
            uploads: vm.uploadStore,
        })),
        inject('media', 'uploads'),
    ],

    computed: {
        settings() {
            return getTypeSettings(this.type);
        },
        media() {
            return this.$media.media;
        },
        hasMedia() {
            return this.media.length > 0;
        },
        hasActiveMedia() {
            return this.media.filter(media => media.markedForRemoval !== true).length > 0;
        },
        uploads() {
            return this.$uploads.uploads;
        },
        hasUploads() {
            return this.uploads.length > 0;
        },
        isEmpty() {
            return ! this.hasMedia && ! this.hasUploads;
        },
        uploadButtonText() {
            if (this.settings.multiple) {
                return translate('addMedia');
            }
            return this.isEmpty ? translate('addMedia') : translate('replaceMedia');
        },
        canBeCleared() {
            if (! this.hasActiveMedia) {
                return false;
            }
            return this.settings.multiple;
        },
    },

    methods: {
        markAllMediaForRemoval() {
            this.$media.markAllMediaForRemoval();
        },
        translate,
    },

    created() {
        this.$media.addMedia(this.initial);
    },
};
</script>

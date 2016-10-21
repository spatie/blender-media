<template>
    <div class="media">
        <upload
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
            <upload-errors
                :collection="collection"
            ></upload-errors>
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
                    @click.prevent="markCollectionForRemoval({ collection })"
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
import { mapActions, mapState } from 'vuex';
import Export from './export/export';
import { getTypeSettings } from '../settings/types';
import MediaTable from './media/media-table';
import store from '../store';
import translate from '../translations';
import Upload from './upload/upload';
import UploadErrors from './upload/upload-errors';
import UploadTable from './upload/upload-table';

export default {

    store,

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
        UploadErrors,
        UploadTable,
    },

    computed: {
        ...mapState({
            media(state) {
                return state.media.media.filter(m => m.collection === this.collection);
            },
            uploads(state) {
                return state.uploads.uploads.filter(m => m.collection === this.collection);
            },
        }),
        settings() {
            return getTypeSettings(this.type);
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
        ...mapActions([
            'addMedia',
            'markCollectionForRemoval',
        ]),
        translate,
    },

    ready() {
        this.addMedia({ media: this.initial });
    },
};
</script>

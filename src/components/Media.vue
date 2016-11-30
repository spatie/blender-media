<template>
    <upload class="media" :store="store">
        <media-table
            v-if="store.hasMedia"
            :store="store"
        ></media-table>
        <upload-table
            v-if="store.hasUploads"
            :uploads="store.uploads"
        ></upload-table>
        <no-media
            v-if="store.isEmpty"
        ></no-media>
        <error-message
            :text="store.error"
            @clear-error="store.clearError"
        ></error-message>
        <actions
            :allow-multiple="store.settings.multiple"
            :can-be-cleared="store.canBeCleared"
            :is-empty="store.isEmpty"
            :debug="store.debug"
            :export="store.export"
            @mark-all-media-for-removal="store.markAllMediaForRemoval"
        ></actions>
        <textarea
            style="display: none"
            :name="store.collection"
            :value="store.export"
        ></textarea>
    </upload>
</template>

<script>
import Actions from './actions/actions';
import ErrorMessage from './ui/ErrorMessage';
import MediaTable from './media/MediaTable';
import NoMedia from './ui/NoMedia';
import Upload from './upload/Upload';
import UploadTable from './upload/UploadTable';

export default {

    props: {
        store: {
            required: true,
            type: Object,
        },
    },

    components: {
        Actions,
        ErrorMessage,
        MediaTable,
        NoMedia,
        Upload,
        UploadTable,
    },
};
</script>

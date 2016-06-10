import { hydrate, state } from '../store';
import Dropzone from 'dropzone';
import Export from './export/export';
import { getSettings } from '../settings';
import MediaTable from './media/media-table';

export default {

    template: `
        <div class="media" v-el:media>
            <media-table
                :collection="collection"
                :media="media"
                :editor="settings.editor"
            ></media-table>
            <export
                :collection="collection"
                :media="media"
            ></export>
        </div>
    `,

    props: {
        collection: {
            required: true,
        },
        type: {
            required: true,
        },
        uploadUrl: {
            required: true,
        },
        initial: {
            default: [],
        },
    },

    components: {
        Export,
        MediaTable,
    },

    data() {
        return { state };
    },

    computed: {
        media() {
            return this.state.media.filter(m => m.collection === this.collection);
        },
        settings() {
            return getSettings(this.type);
        },
    },

    ready() {
        hydrate({ media: this.initial });

        new Dropzone(this.$els.media, {
            url: this.uploadUrl,
            uploadMultiple: this.settings.multiple,
            acceptedFiles: this.settings.accepts,
            previewTemplate: false,
            addedfile: this.addedFile,
            success: this.success,
            error: this.error,
        });
    },

    methods: {
        addedFile() {
            
        },
        success() {

        },
        error() {

        },
    },

};

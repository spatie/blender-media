import { hydrate, state } from '../store';
import Export from './export/export';
import { getSettings } from '../settings';
import MediaTable from './media/media-table';

export default {

    template: `
        <div class="media">
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
    },

};

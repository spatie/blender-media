import { hydrate, state } from '../store';
import Export from './export/export';
import MediaTable from './media/media-table';

export default {

    template: `
        <div class="media">
            <media-table
                :collection="collection"
                :media="media"
                :editor="editor"
            ></media-table>
            <export
                :collection="collection"
                :media="media"
            ></export>
        </div>
    `,

    props: {
        collection: {
            default: '',
        },
        editor: {
            default: 'basic',
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
    },

    ready() {
        hydrate({ media: this.initial });
    },

};

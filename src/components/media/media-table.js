import MediaRow from './media-row';
import { sort } from '../../lib/media';
import sortable from '../sortable/sortable';

export default {

    template: `
        <table v-el:sort-container>
            <tbody v-for="media in orderedMedia">
                <tr
                    is="media-row"
                    :media="media"
                    :editor="editor"
                ></tr>
            </tbody>
        </table>
    `,

    props: ['collection', 'media', 'editor'],

    mixins: [sortable],

    components: {
        MediaRow,
    },

    computed: {
        orderedMedia() {
            return sort(this.media);
        },
    },

};

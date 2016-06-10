import MediaRow from './media-row';
import { sort } from '../../lib/media';

export default {

    template: `
        <table>
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

    components: {
        MediaRow,
    },

    computed: {
        orderedMedia() {
            return sort(this.media);
        },
    },

};

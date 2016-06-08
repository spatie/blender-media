import MediaRow from './media-row';
import { sort } from '../../lib/media';

export default {

    template: `
        <div>
            <table v-if="hasMedia">
                <tbody v-for="media in orderedMedia">
                    <tr
                        is="media-row"
                        :media="media"
                        :editor="editor"
                    ></tr>
                </tbody>
            </table>
            <div v-else>
                dataTables.infoEmpty
            </div>
        </div>
    `,

    props: ['collection', 'media', 'editor'],

    components: {
        MediaRow,
    },

    computed: {
        orderedMedia() {
            return sort(this.media);
        },
        hasMedia() {
            return this.media.length > 0;
        },
    },

};

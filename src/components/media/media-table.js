import MediaRow from './media-row';
import { sort } from '../../lib/media';
import Sortable from '../sortable/sortable';

export default {

    template: `
        <table
            v-el:container
            v-sortable
            handle=".js-handle"
            class="media__table"
        >
            <tbody v-for="media in orderedMedia">
                <tr
                    is="media-row"
                    :media="media"
                    :editor="editor"
                    class="media__row"
                ></tr>
            </tbody>
        </table>
    `,

    props: ['collection', 'media', 'editor'],

    components: {
        MediaRow,
    },

    directives: {
        Sortable,
    },

    computed: {
        orderedMedia() {
            return sort(this.media);
        },
    },

    vuex: {
        actions: {
            setMediaOrder: ({ dispatch }, order) => dispatch('SET_MEDIA_ORDER', order),
        },
    },

    events: {
        reordered({ elements }) {

            const order = elements
                .map(tbody => tbody.children[0])
                .map(row => parseInt(row.dataset.mediaId))
                .reduce((order, mediaId) => {
                    order[mediaId] = Object.keys(order).length;
                    return order;
                }, {});

            this.setMediaOrder(order);
        },
    },

};

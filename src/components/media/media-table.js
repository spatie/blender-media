import MediaRow from './media-row';
import Sortable from '../sortable/sortable';
import { sortBy } from 'lodash';

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
                    :data="data"
                    :editor="editor"
                    class="media__row"
                ></tr>
            </tbody>
        </table>
    `,

    props: ['collection', 'media', 'editor', 'data'],

    components: {
        MediaRow,
    },

    directives: {
        Sortable,
    },

    computed: {
        orderedMedia() {
            return sortBy(this.media, 'orderColumn');
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

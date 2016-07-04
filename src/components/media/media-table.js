import MediaRow from './media-row';
import { setMediaOrder } from '../../actions';
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
                    :options="options"
                    class="media__row"
                    :class="{ '-is-disabled': media.markedForRemoval }"
                ></tr>
            </tbody>
        </table>
    `,

    props: ['collection', 'media', 'options', 'data'],

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
            setMediaOrder,
        },
    },

    events: {
        reordered({ elements }) {

            const order = elements
                .map(tbody => tbody.children[0])
                .map(row => parseInt(row.getAttribute('data-media-id'))
                .reduce((order, mediaId) => {
                    order[mediaId] = Object.keys(order).length;
                    return order;
                }, {});

            this.setMediaOrder(order);
        },
    },

};

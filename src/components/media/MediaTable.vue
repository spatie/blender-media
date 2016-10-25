<template>
    <table class="media__table">
        <tbody v-for="media in orderedMedia">
            <tr
                is="media-row"
                :media="media"
                :data="data"
                :settings="settings"
                class="media__row"
                :class="{ '-is-disabled': media.markedForRemoval }"
            ></tr>
        </tbody>
    </table>
</template>

<script>
import MediaRow from './MediaRow';
import { sortBy } from 'lodash';

export default {

    props: ['collection', 'media', 'settings', 'data'],

    components: {
        MediaRow,
    },

    computed: {
        orderedMedia() {
            return sortBy(this.media, 'orderColumn');
        },
    },

    // events: {
    //     reordered({ elements }) {
    //
    //         const order = elements
    //             .map(tbody => tbody.children[0])
    //             .map(row => parseInt(row.getAttribute('data-media-id')))
    //             .reduce((order, mediaId) => {
    //                 order[mediaId] = Object.keys(order).length;
    //                 return order;
    //             }, {});
    //
    //         this.$store.commit('setMediaOrder', { order });
    //     },
    // },
};
</script>

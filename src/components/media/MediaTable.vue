<template>
    <table class="media__table">
        <tr
            v-for="media in orderedMedia"
            is="media-row"
            ref="rows"
            :media="media"
            :data="data"
            :settings="settings"
            class="media__row"
            :class="{ '-is-disabled': media.markedForRemoval }"
        ></tr>
    </table>
</template>

<script>
import constrain from 'dragula-constrain';
import dragula from 'dragula';
import { inject } from 'vue-expose-inject';
import { matches } from '../../util';
import MediaRow from './MediaRow';
import { sortBy } from 'lodash';

export default {

    props: ['collection', 'media', 'settings', 'data'],

    components: {
        MediaRow,
    },

    mounted() {
        this.sortable = dragula([this.$el], {
            moves(element, container, handleElement) {
                return matches(handleElement, '.js-handle');
            },
        });

        constrain(this.sortable);

        this.sortable.on('drop', function () {
            const order = this.$refs.rows
                .map(row => row.media.id)
                .reduce((order, mediaId) => {
                    order[mediaId] = Object.keys(order).length;
                    return order;
                }, {});

            this.store.setNewOrder(order);
        }.bind(this));
    },

    beforeDestroy() {
        this.sortable.destroy();
    },

    computed: {
        ...inject(['store']),
        orderedMedia() {
            return sortBy(this.media, 'orderColumn');
        },
    },
};
</script>

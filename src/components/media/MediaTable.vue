<template>
    <table class="media__table">
        <tr
            v-for="media in orderedMedia"
            is="media-row"
            :media="media"
            :data="data"
            :settings="settings"
            class="media__row"
            :class="{ '-is-disabled': media.markedForRemoval }"
            :data-media-id="media.id"
        ></tr>
    </table>
</template>

<script>
import constrain from 'dragula-constrain';
import dragula from 'dragula';
import { queryAll } from 'spatie-dom';
import { matches, required } from '../../lib/util';
import MediaRow from './MediaRow';
import { sortBy } from 'lodash';

export default {

    props: required([
        'media',
        'data',
        'settings',
    ]),

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
            const order = queryAll('.media__row', this.$el)
                .map(row => row.dataset.mediaId)
                .reduce((order, mediaId) => {
                    order[mediaId] = Object.keys(order).length;
                    return order;
                }, {});

            this.sortable.cancel(true);

            this.$emit('reordered', { order });
        }.bind(this));
    },

    beforeDestroy() {
        this.sortable.destroy();
    },

    computed: {
        orderedMedia() {
            return sortBy(this.media, 'orderColumn');
        },
    },
};
</script>

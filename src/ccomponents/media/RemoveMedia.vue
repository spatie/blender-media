<template>
    <div>
        <div v-if="media.markedForRemoval">
            <a
                href="#"
                class="media__column--actions__icon -restore"
                @click.prevent="restoreMedia(media)"
            >
                <i class="fa fa-undo"></i>
            </a>
        </div>
        <div v-else>
            <a
                href="#"
                class="media__column--actions__icon -delete"
                @click.prevent="markMediaForRemoval(media)"
            >
                <i class="fa fa-remove"></i>
            </a>
        </div>
    </div>
</template>

<script>
import inject from '../../mixins/inject';

export default {

    props: ['media'],

    mixins: [
        inject('media'),
    ],

    methods: {
        markMediaForRemoval(media) {
            this.$media.markMediaForRemoval(media.id);
        },
        restoreMedia(media) {
            this.$media.restoreMedia(media.id);
        },
    },
};
</script>

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
import { inject } from 'vue-expose-inject';

export default {

    props: ['media'],

    computed: {
        ...inject(['store']),
    },

    methods: {
        markMediaForRemoval(media) {
            this.store.markMediaForRemoval(media.id);
        },
        restoreMedia(media) {
            this.store.restoreMedia(media.id);
        },
    },
};
</script>

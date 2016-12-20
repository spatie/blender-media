<template>
    <div>
        <div v-if="media.markedForRemoval">
            <a
                href="#"
                class="media__column--actions__icon -restore"
                @click.prevent="restoreMedia"
            >
                <i class="fa fa-undo"></i>
            </a>
        </div>
        <div v-else>
            <a
                href="#"
                class="media__column--actions__icon -delete"
                @click.prevent="markMediaForRemoval"
            >
                <i class="fa fa-trash"></i>
            </a>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { required } from '../../lib/util';

export default {

    props: required(['media']),

    methods: {
        markMediaForRemoval() {
            Vue.set(this.media, 'markedForRemoval', true);
        },

        restoreMedia() {
            Vue.set(this.media, 'markedForRemoval', false);
        },
    },
};
</script>

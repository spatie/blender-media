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
                <i class="fa fa-remove"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {

    props: ['media'],

    methods: {
        markMediaForRemoval() {
            this.media.markedForRemoval = true;
        },

        restoreMedia() {
            this.media.markedForRemoval = false;
        },
    },
};
</script>

export default {

    template: `
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
    `,

    props: ['media'],

    methods: {
        markMediaForRemoval(media) {
            this.$store.dispatch('markMediaForRemoval', { id: media.id });
        },
        restoreMedia(media) {
            this.$store.dispatch('restoreMedia', { id: media.id });
        },
    },

};

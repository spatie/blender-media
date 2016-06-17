export default {

    template: `
        <a class="button -small -danger" @click="removeMedia(media)">
            <i class="fa fa-remove"></i> Remove
        </a>
    `,

    props: ['media'],

    vuex: {
        actions: {
            removeMedia: ({ dispatch }, media) => dispatch('REMOVE_MEDIA', media),
        },
    },

};

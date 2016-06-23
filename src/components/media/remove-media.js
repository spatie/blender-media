export default {

    template: `
        <a href="#" class="media__row__delete" @click="removeMedia(media)">
            <i class="fa fa-remove"></i>
        </a>
    `,

    props: ['media'],

    vuex: {
        actions: {
            removeMedia: ({ dispatch }, media) => dispatch('REMOVE_MEDIA', media),
        },
    },

};

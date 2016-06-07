export default {

    template: `
        <a class="button -small -danger" @click="remove">
            <i class="fa fa-remove"></i>
        </a>
    `,

    props: ['media'],

    vuex: {
        actions: {
            remove: ({ dispatch }) => dispatch('REMOVE_MEDIA', this.media),
        },
    },

};

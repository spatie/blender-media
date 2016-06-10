import { removeMedia } from '../../store';

export default {

    template: `
        <a class="button -small -danger" @click="remove">
            <i class="fa fa-remove"></i> Remove
        </a>
    `,

    props: ['media'],

    methods: {
        remove() {
            removeMedia(this.media);
        },
    },

};

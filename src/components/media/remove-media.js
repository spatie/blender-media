import { removeMedia, restoreMedia } from '../../actions';

export default {

    template: `
        <div>
            <div v-if="media.markedForRemoval">
                <a
                    href="#"
                    class="media__row__restore"
                    @click="restoreMedia(media)"
                >
                    <i class="fa fa-undo"></i>
                </a>
            </div>
            <div v-else>
                <a
                    href="#"
                    class="media__row__delete"
                    @click="removeMedia(media)"
                >
                    <i class="fa fa-remove"></i>
                </a>
            </div>
        </div>
    `,

    props: ['media'],

    vuex: {
        actions: {
            removeMedia,
            restoreMedia,
        },
    },

};

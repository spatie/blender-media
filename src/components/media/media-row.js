import { getEditor } from '../../settings';
import RemoveMedia from './remove-media';
import Thumb from './thumb';

export default {

    template: `
        <tr style="width: 300px; height: 50px; background-color: red;">
            <td>
                <i
                    class="js-handle fa fa-arrows-v"
                    style="cursor: move; user-select: none;"
                >X</i>
            </td>
            <td>
                <thumb :media="media"></thumb>
            </td>
            <td>
                <component
                    is="editor"
                    :media="media"
                ></component>
            </td>
            <td>
                <remove-media :media="media"></remove-media>
            </td>
        </tr>
    `,

    props: ['media', 'editor'],

    components: {
        RemoveMedia,
        Thumb,
        editor(resolve) {
            resolve(getEditor(this.editor));
        },
    },

    ready() {
        this.$el.mediaId = this.media.id;
    },

};

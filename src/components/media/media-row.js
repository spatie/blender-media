import { getEditor } from '../../settings';
import RemoveMedia from './remove-media';
import Thumb from './thumb';

export default {

    template: `
        <tr :data-media-id="media.id">
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

};

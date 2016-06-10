import { getEditor } from '../../settings';
import RemoveMedia from './remove-media';
import Thumb from './thumb';

export default {

    template: `
        <tr class="row">
            <td class="row_order" data-sortablehandle>
                <i class="fa fa-arrows-v"></i>
            </td>
            <td className="row_thumb">
                <thumb :media="media"></thumb>
            </td>
            <td>
                <component
                    is="editor"
                    :media="media"
                ></component>
            </td>
            <td class="row_actions">
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

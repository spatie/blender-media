import { assign } from 'lodash';
import { getEditors } from '../../options/editors';
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
                <div
                    :is="editor"
                    :media="media"
                    :data="data"
                ></div>
            </td>
            <td>
                <remove-media :media="media"></remove-media>
            </td>
        </tr>
    `,

    props: ['media', 'editor', 'data'],

    components: assign({
        RemoveMedia,
        Thumb,
    }, getEditors()),

};

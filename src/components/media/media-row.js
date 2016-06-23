import { getEditor } from '../../lib/editors';
import RemoveMedia from './remove-media';
import Thumb from './thumb';

export default {

    template: `
        <tr :data-media-id="media.id">
            <td class="media__row__cell--drag">
               <i class="js-handle fa fa-arrows-v"></i>
            </td>
            <td class="media__row__cell--thumb">
                <thumb :media="media"></thumb>
            </td>
            <td class="media__row__cell--editor">
                <component
                    is="editor"
                    :media="media"
                ></component>
            </td>
            <td class="media__row__cell--actions">
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

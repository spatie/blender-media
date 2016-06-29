import { assign } from 'lodash';
import { getEditors } from '../../options/editors';
import RemoveMedia from './remove-media';
import Thumb from './thumb';

export default {

    template: `
        <tr :data-media-id="media.id">
            <td class="media__column--drag">
               <i class="js-handle fa fa-arrows-v media__column--drag__icon"
                  :class="{ '-is-disabled' : media.markedForRemoval || !options.multiple }"
                ></i>
            </td>
            <td class="media__column--thumb">
                <thumb :media="media"
                       :class="{ '-is-disabled': media.markedForRemoval }"
                >
                </thumb>
            </td>
            <td class="media__column--editor">
                <div
                    :is="options.editor"
                    :media="media"
                    :data="data"
                ></div>
            </td>
            <td class="media__column--actions">
                <remove-media :media="media"></remove-media>
            </td>
        </tr>
    `,

    props: ['media', 'options', 'data'],

    components: assign({
        RemoveMedia,
        Thumb,
    }, getEditors()),

};

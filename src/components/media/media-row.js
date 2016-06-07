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
            <slot></slot>
            <td class="row_actions">
                <remove-media :media="media"></remove-media>
            </td>
        </tr>
    `,

    components: {
        RemoveMedia,
        Thumb,
    },

    props: ['media'],

};

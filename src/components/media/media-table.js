import MediaRow from './media-row';
import sort from '../../lib/media';

export default {

    template: `
        <table>
            <tbody v-if="hasMedia" v-for="item in media">
                <tr is="media-row" :media="item">
                    Editor...
                </tr>
            </tbody>
            <tbody v-else>
                dataTables.infoEmpty
            </tbody>
        </table>
    `,

    components: {
        MediaRow,
    },

    vuex: {
        getters: {
            media: state => sort(state.media),
        },
    },

    computed: {
        hasMedia: () => this.media.length > 1,
    },

};

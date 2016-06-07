import Export from './export/export';
import MediaTable from './media/media-table';

export default {

    template: `
        <div class="media">
            <!--
            <media-table></media-table>
            <export></export>
            -->
        </div>
    `,

    props: ['collection', 'initial'],

    components: {
        Export,
        MediaTable,
    },

    vuex: {
        actions: {
            hydrate: ({ dispatch }, data) => dispatch('HYDRATE', data),
        },
    },

    ready() {
        console.log(this.collection);
        console.log(this.initial);
    },

};

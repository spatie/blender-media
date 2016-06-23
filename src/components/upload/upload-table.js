import { sortBy } from 'lodash';

export default {

    template: `
        <table>
            <tbody v-for="upload in orderedUploads">
                <tr>
                    <td colspan="4">
                        {{ upload.name }}
                        <div :style="{ width: upload.progress + '%', height: '10px', backgroundColor: 'red' }"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    `,

    props: ['uploads'],

    computed: {
        orderedUploads() {
            return sortBy(this.uploads, 'id');
        },
    },

};

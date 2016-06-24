import { sortBy } from 'lodash';

export default {

    template: `
        <table class="media__upload__table">
            <tbody v-for="upload in orderedUploads">
                 <tr class="media__upload__row">
                    <td class="media__upload__column--thumb">
                       <span class="media__thumb -ghost">
                    </td>
                    <td class="media__upload__column--progress">
                        <div class="media__progress">
                            <div class="media__progress__name">
                                {{ upload.name }}
                            </div>
                            <div
                                class="media__progress__bar"
                                :style="{ transform: 'translateX(' + (upload.progress - 100) + '%)' }"
                            >
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    `,

    props: ['uploads'],

    computed: {
        orderedUploads() {
            return sortBy(this.uploads, 'id');
        }
    },

};

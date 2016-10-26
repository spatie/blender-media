<template>
    <table class="media__upload__table">
        <tbody v-for="upload in orderedUploads">
            <tr class="media__upload__row">
                <td class="media__upload__column--thumb">
                    <span class="media__thumb -ghost">
                        <span class="media__thumb__file -ghost">
                            <i :class="['fa', icon(upload), 'media__thumb__file__icon']"></i>
                        </span>
                    </span>
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
</template>

<script>
import { getClassNameForExtension } from 'font-awesome-filetypes';
import { sortBy } from 'lodash';

export default {

    props: ['uploads'],

    computed: {
        orderedUploads() {
            return sortBy(this.uploads, 'id');
        },
    },

    methods: {
        icon(upload) {
            return getClassNameForExtension(upload.name);
        },
    },
};
</script>

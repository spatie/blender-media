import getClassNameForExtension from 'font-awesome-filetypes';
import { includes } from 'lodash';

export default {

    template: `
        <a :href="originalUrl" target="blender_media" tabIndex="-1">
            <span v-if="isImage">
                <img :src="thumbUrl" class="image" :style="{ width: '50px' }" />
            </span>
            <span v-else>
                <span class="icon">
                    <i :class="['fa', icon]"></i>
                </span>
            </span>
        </a>
    `,

    props: ['media'],

    computed: {
        extension() {
            return this.media.file_name.split('.').pop().toLowerCase();
        },
        icon() {
            return getClassNameForExtension(this.extension);
        },
        isImage() {
            return includes(['jpg', 'jpeg', 'gif', 'png'], this.extension);
        },
        originalUrl() {
            return this.media.originalUrl;
        },
        thumbUrl() {
            return this.media.thumbUrl;
        },
    },

};

import { icon, isImage } from '../../lib/media';

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
        icon() {
            return icon(this.media);
        },
        isImage() {
            return isImage(this.media);
        },
        originalUrl() {
            return this.media.originalUrl;
        },
        thumbUrl() {
            return this.media.thumbUrl;
        },
    },

};

import { icon, isImage, originalUrl, thumbUrl } from '../../lib/media';

export default {

    template: `
        <a :href="originalUrl" target="blender_media" tabIndex="-1">
            <span v-if="isImage">
                <img :src="thumbUrl" class="image" />
            </span>
            <span v-else>
                <span class="icon">
                    <i class="fa" :class="icon"></i>
                </span>
            </span>
        </a>
    `,

    props: ['media'],

    computed: {
        icon: () => icon(this.media),
        isImage: () => isImage(this.media),
        originalUrl: () => originalUrl(this.media),
        thumbUrl: () => thumbUrl(this.media),
    },

};

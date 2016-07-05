import getClassNameForExtension from 'font-awesome-filetypes';
import { includes } from 'lodash';

export default {

    template: `
        <a
            :href="originalUrl"
            target="blender_media"
            tabIndex="-1"
            class="media__thumb"
        >
            <img
                v-if="isImage"
                :src="thumbUrl"
                class="media__thumb__image"
              />
            <span
                v-else
                class="media__thumb__file"
            >
                <i :class="['fa', icon, 'media__thumb__file__icon']"></i>
            </span>
        </a>
    `,

    props: ['media'],

    computed: {
        extension() {
            return this.media.fileName.split('.').pop().toLowerCase();
        },
        icon() {
            return getClassNameForExtension(this.extension);
        },
        isImage() {
            return includes(['jpg', 'jpeg', 'gif', 'png', 'svg'], this.extension);
        },
        originalUrl() {
            return this.media.originalUrl;
        },
        thumbUrl() {
            return this.media.thumbUrl;
        },
    },

};

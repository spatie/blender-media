<template>
    <tr :data-media-id="media.id">
        <td class="media__column--drag">
           <i
              class="js-handle fa fa-arrows-v media__column--drag__icon"
              :class="{ '-is-disabled' : media.markedForRemoval || !settings.multiple }"
            ></i>
        </td>
        <td class="media__column--thumb">
            <thumb
                :media="media"
                :class="{ '-is-disabled': media.markedForRemoval }"
            ></thumb>
        </td>
        <td class="media__column--editor">
            <media-editor
                :type="settings.editor"
                :media="media"
                :data="data"
            ></media-editor>
        </td>
        <td class="media__column--actions">
            <remove-media :media="media"></remove-media>
        </td>
    </tr>
</template>

<script>
import MediaEditor from './MediaEditor';
import RemoveMedia from './RemoveMedia';
import Thumb from './Thumb';

export default {

    props: ['media', 'settings', 'data'],

    components: {
        MediaEditor,
        RemoveMedia,
        Thumb,
    },
};
</script>

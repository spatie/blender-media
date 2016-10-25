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
            >
            </thumb>
        </td>
        <td class="media__column--editor">
            {{ media.name }}
            <!--<div
                :is="settings.editor"
                :media="media"
                :data="data"
            ></div>-->
        </td>
        <td class="media__column--actions">
            <remove-media :media="media"></remove-media>
        </td>
    </tr>
</template>

<script>
import RemoveMedia from './RemoveMedia';
import Thumb from './thumb';

export default {

    props: ['media', 'settings', 'data'],

    components: {
        RemoveMedia,
        Thumb,
    },
};
</script>

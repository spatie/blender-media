<template>
    <div v-show="false">
        <textarea
            :name="collection"
            :value="data"
            :style="{ width: '100%', height: '300px' }"
        ></textarea>
    </div>
</template>

<script>
import { pipe } from '../../helpers';
import { sortBy } from 'lodash';

export default {

    props: ['collection', 'media'],

    computed: {
        data() {
            return pipe(
                this.media,
                media => media.filter(media => !media.markedForRemoval),
                media => sortBy(media, 'orderColumn'),
                media => JSON.stringify(media)
            );
        },
    },

};
</script>

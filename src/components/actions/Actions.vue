<template>
    <div class="media__actions">
        <button
            class="media__button | js-add-media"
            @click.prevent
        >
            {{ uploadButtonText }}
        </button>
        <button
            v-if="debug"
            class="media__button--debug"
            @click.prevent="sendExportToConsole"
        >
            DEBUG
        </button>
        <button
            v-if="canBeCleared"
            class="media__button--delete"
            @click.prevent="markAllMediaForRemoval"
        >
            {{ trans('clearCollection') }}
            <i class="fa fa-trash media__input--button--delete__icon"></i>
        </button>
    </div>
</template>

<script>
import trans from '../../lib/trans';

export default {

    props: ['allowMultiple', 'canBeCleared', 'isEmpty', 'debug', 'export'],

    computed: {
        uploadButtonText() {
            if (this.allowMultiple) {
                return trans('addMedia');
            }
            
            return this.isEmpty ? trans('addMedia') : trans('replaceMedia');
        },
    },

    methods: {
        trans,

        markAllMediaForRemoval() {
            this.$emit('markAllForRemoval');
        },

        sendExportToConsole() {
            // eslint-disable-next-line no-console
            console.log(window.__media = this.export);
        },
    },
};
</script>
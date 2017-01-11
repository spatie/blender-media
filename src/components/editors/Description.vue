<template>
    <div class="media__editor -padded">
        <span
            v-for="(description, locale) in descriptions"
            class="media__editor__column -stretch -stacked"
        >
            <label class="label--lang">
                {{ locale }}
            </label>
            <input
                type="text"
                class="media__input--text"
                :value="description"
                @input="updateDescription(locale, $event.target.value)"
            >
        </span>
    </div>
</template>

<script>
import editor from './editor';

export default {

    mixins: [editor],

    props: ['media'],

    translatableCustomProperties: {
        description: '',
    },

    computed: {
        descriptions() {
            return this.customProperty('description');
        },
    },

    methods: {
        blurInput(event) {
            event.target.blur();
        },

        updateDescription(locale, value) {
            this.setTranslation('description', locale, value);
        },
    },
};
</script>

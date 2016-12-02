<template>
    <div class="media__editor">
        <span class="media__editor__column -stretch">
            <input
                class="media__input--text"
                :disabled="media.markedForRemoval"
                type="text"
                v-model="media.name"
                @keydown.enter.prevent="blurInput"
            >
        </span>
        <span class="media__editor__column">
            <label
                class="media__input__label"
                v-for="(toggled, locale) in locales"
            >
                {{ locale }}
                <input
                    class="media__input--checkbox"
                    :disabled="media.markedForRemoval"
                    type="checkbox"
                    :checked="toggled"
                    @change="toggleLocale(locale)"
                >
            </label>
        </span>
    </div>
</template>

<script>
import editor from './editor';

export default {

    mixins: [editor],

    computed: {
        locales() {
            return this.media.customProperties.locales;
        },
    },

    methods: {
        toggleLocale(locale) {
            this.setTranslation('locales', locale, ! this.getTranslation('locales', locale));
        },
    },

    created() {
        this.initializeTranslations('locales', true);
    },
};
</script>

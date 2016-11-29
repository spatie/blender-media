import { pick, keys } from 'lodash';
import Vue from 'vue';

export default {

    props: ['media', 'data'],

    methods: {
        blurInput(event) {
            event.target.blur();
        },

        setCustomProperty(key, value) {
            Vue.set(this.media.customProperties, key, value);
        },

        getCustomProperty(key, fallback) {
            if (! this.media.customProperties.hasOwnProperty(key)) {
                return fallback;
            }

            return this.media.customProperties[key];
        },
        
        normalizeTranslations(key, defaultValue = '') {
            let translations = this.getCustomProperty(key, {});
            
            const blueprint = this.data.locales.reduce((translations, locale) => {
                translations[locale] = defaultValue;
                return translations;
            }, {});

            translations = pick({ ...blueprint, ...translations }, keys(blueprint));

            this.setCustomProperty(key, translations);
        },

        getTranslation(key, locale) {
            return this.media.customProperties[key][locale];
        },

        setTranslation(key, locale, value) {
            Vue.set(this.media.customProperties[key], locale, value);
        },
    },
};
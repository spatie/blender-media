import { forEach, pick, keys } from 'lodash';
import Vue from 'vue';

export default {

    props: ['media', 'data'],

    created() {
        if (this.$options.customProperties) {
            forEach(this.$options.customProperties, (val, prop) => {
                this.setCustomProperty(prop, this.customProperty(prop, val));
            });
        }
        
        if (this.$options.translatableCustomProperties) {
            forEach(this.$options.translatableCustomProperties, (val, prop) => {
                this.initializeTranslations(prop, val);
            });
        }

        console.log(this.media.customProperties);
    },

    methods: {
        blurInput(event) {
            event.target.blur();
        },

        customProperty(key, fallback = null) {
            if (! this.media.customProperties.hasOwnProperty(key)) {
                return fallback;
            }

            return this.media.customProperties[key];
        },

        setCustomProperty(key, value) {
            Vue.set(this.media.customProperties, key, value);
        },
        
        initializeTranslations(key, defaultValue = '') {
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
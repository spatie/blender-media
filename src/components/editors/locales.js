import { assign, keys, pick } from 'lodash';
import editor from './editor';

export default {

    template: `
        <div class="media__editor">
            <span class="media__editor__column -stretch">
                <input
                    class="media__form__text"
                    type="text"
                    v-model="name"
                >
            </span>
            <span class="media__editor__column">
                <label
                    class="media__form__label"
                    v-for="(locale, toggled) in locales"
                >
                    {{ locale }}
                    <input
                        class="media__form__checkbox"
                        type="checkbox"
                        :checked="toggled"
                        @change="toggleLocale(locale)"
                    >
                </label>
            </span>
        </div>
    `,

    mixins: [editor],

    computed: {
        locales() {
            return this.customProperty('locales');
        },
    },

    methods: {
        toggleLocale(locale) {
            this.updateCustomProperty(`locales.${locale}`, !this.locales[locale]);
        },
        normalizeLocales() {

            const locales = this.data.locales.reduce((locales, locale) => {
                locales[locale] = true;
                return locales;
            }, {});

            this.updateCustomProperty('locales', pick(
                assign({}, locales, this.customProperty('locales')),
                keys(locales)
            ));
        },
    },

    ready() {
        this.normalizeLocales();
    },

};

import { assign, keys, pick } from 'lodash';
import editor from './editor';

export default {

    template: `
        <div>
            <div>
                <input type="text" v-model="name">
            </div>
            <div>
                <label v-for="(locale, toggled) in locales">
                    {{ locale }}
                    <input
                        type="checkbox"
                        :checked="toggled"
                        @change="toggleLocale(locale)"
                    >
                </label>
            </div>
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

import editor from './editor';

export default {

    template: `
        <div>
            <div>
                <input type="text" v-model="name">
            </div>
            <div>
                <label v-for="locale in data.locales">
                    {{ locale }}
                    <input
                        :checked="locales[locale]"
                        @change="toggleLocale(locale)"
                    >
                </label>
            </div>
        </div>
    `,

    mixin: [editor],

    computed: {
        locales() {
            return this.media.custom_properties.locales || {};
        },
    },

    methods: {
        toggleLocale(locale) {
            this.updateCustomProperty(`locales.${locale}`, locale);
        },
    },

};

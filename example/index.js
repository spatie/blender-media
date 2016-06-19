import Media, { LocaleEditor, registerType } from '../src';
import Vue from 'vue';

registerType('images', {
    editor: LocaleEditor,
});

registerType('download', {
    editor: LocaleEditor,
});

new Vue({

    el: 'body',

    components: {
        Media,
    },

});

import Media, { LocaleEditor, registerType } from '../src';
import Vue from 'vue';

registerType('downloads', {
    editor: LocaleEditor,
});

new Vue({

    el: 'body',

    components: {
        Media,
    },

});

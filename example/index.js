import Media, { extendType } from '../src';
import Vue from 'vue';

extendType('images', {
    editor: 'locales',
});

extendType('download', {
    editor: 'locales',
});

new Vue({

    el: 'body',

    components: {
        Media,
    },

});

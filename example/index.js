import Media, { extendType } from '../src';
import Vue from 'vue';

extendType('download', {
    editor: 'locales',
});

new Vue({

    el: 'body',

    components: {
        Media,
    },

});

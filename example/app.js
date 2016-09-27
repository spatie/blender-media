import Media, { extendType } from '../src';
import Vue from 'vue';

extendType('download', {
    editor: 'locales',
});

Vue.component('media', Media);

new Vue({ el: '#app' });

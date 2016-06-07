import './lib/lodash';

import Media from './components/media';
import store from './store';
import Vue from 'vue';

new Vue({

    el: 'body',

    store,

    components: {
        Media,
    },

});

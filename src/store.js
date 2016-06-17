import errors from './modules/errors';
import media from './modules/media';
import uploads from './modules/uploads';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        media,
        uploads,
        errors,
    },
    strict: true,
});

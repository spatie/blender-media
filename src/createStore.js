import { cloneDeep } from 'lodash';
import media from './modules/media';
import uploads from './modules/uploads';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function createStore() {
    return new Vuex.Store({
        modules: {
            media: cloneDeep(media),
            uploads: cloneDeep(uploads),
        },
        strict: process.env.NODE_ENV === 'development',
    });
}

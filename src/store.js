import { debug } from './lib/helpers';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    media: [],
};

const mutations = {

    HYDRATE(state, { collection, media }) {
        state.collection = collection;
        state.media = media;
    },

    ADD_MEDIA(state, { media }) {
        state.media.push(media);
    },

    REMOVE_MEDIA(state, { media }) {
        state.media = state.media.reject(m => m.id === media.id);
    },

};

export default new Vuex.Store({
    state,
    mutations,
    strict: debug,
});

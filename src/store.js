import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    media: [],
};

const mutations = {

    HYDRATE_MEDIA(state, media) {
        state.media = media;
    },

};

export default new Vuex.Store({
    state,
    mutations,
    strict: true,
});

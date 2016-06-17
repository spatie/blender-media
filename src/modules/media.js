import { forIn } from 'lodash';
import Vue from 'vue';

const state = {
    media: {},
};

const mutations = {

    HYDRATE(state, { media }) {
        mutations.ADD_MEDIA(state, media);
    },

    ADD_MEDIA(state, media) {
        media.forEach(media => Vue.set(state.media, media.id, media));
    },

    UPDATE_MEDIA(state, { id }, prop, value) {
        Vue.set(state.media[id], prop, value);
    },

    REMOVE_MEDIA(state, { id }) {
        Vue.delete(state.media, id);
    },

    SET_MEDIA_ORDER(state, order) {
        forIn(order, (order, mediaId) => {
            state.media[mediaId].order_column = order;
        });
    },

};

export default { state, mutations };

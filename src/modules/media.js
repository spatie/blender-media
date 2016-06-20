import { forIn } from 'lodash';
import Vue from 'vue';

const state = {
    media: {},
};

export const mutations = {

    HYDRATE(state, { media }) {
        mutations.ADD_MEDIA(state, media);
    },

    ADD_MEDIA(state, media) {

        if (!Array.isArray(media)) {
            media = [media];
        }

        media.forEach(media => Vue.set(state.media, media.id, media));
    },

    RENAME_MEDIA(state, { id }, name) {

        if(!state.media[id]) return;

        state.media[id].name = name;
    },

    REMOVE_MEDIA(state, { id }) {
        Vue.delete(state.media, id);
    },

    SET_MEDIA_ORDER(state, order) {
        forIn(order, (order, mediaId) => {
            state.media[mediaId].order_column = order;
        });
    },

    UPDATE_CUSTOM_PROPERTY(state, { id }, prop, value) {

        if(!state.media[id]) return;

        const [ namespace, property ] = prop.split('.');

        if (!property) {
            Vue.set(state.media[id].custom_properties, namespace, value);
            return;
        }

        if (!state.media[id].custom_properties[namespace]) {
            Vue.set(state.media[id].custom_properties, namespace, {});
        }

        Vue.set(state.media[id].custom_properties[namespace], property, value);
    },

};

export default { state, mutations };

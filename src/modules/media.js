import { forIn, values } from 'lodash';
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

    MARK_MEDIA_FOR_REMOVAL(state, { id }) {

        if(!state.media[id]) return;

        Vue.set(state.media[id], 'markedForRemoval', true);
    },

    MARK_COLLECTION_FOR_REMOVAL(state, collection) {
        forIn(state.media, (media) => {
            if (media.collection === collection) {
                mutations.MARK_MEDIA_FOR_REMOVAL(state, media);
            }
        });
    },

    RESTORE_MEDIA(state, { id }) {

        if(!state.media[id]) return;

        Vue.set(state.media[id], 'markedForRemoval', false);
    },

    REPLACE_MEDIA(state, collection, media) {
        mutations.CLEAR_COLLECTION(state, collection);
        mutations.ADD_MEDIA(state, media);
    },

    CLEAR_COLLECTION(state, collection) {
        forIn(state.media, (media, id) => {
            if (media.collection === collection) {
                Vue.delete(state.media, id);
            }
        });
    },

    SET_MEDIA_ORDER(state, order) {
        forIn(order, (order, mediaId) => {
            state.media[mediaId].orderColumn = order;
        });
    },

    UPDATE_CUSTOM_PROPERTY(state, { id }, prop, value) {

        if(!state.media[id]) return;

        const [ namespace, property ] = prop.split('.');

        if (!property) {
            Vue.set(state.media[id].customProperties, namespace, value);
            return;
        }

        if (!state.media[id].customProperties[namespace]) {
            Vue.set(state.media[id].customProperties, namespace, {});
        }

        Vue.set(state.media[id].customProperties[namespace], property, value);
    },

};

export const actions = {};

export const getters = {
    all: state => values(state.media),
};

export default { state, mutations, actions, getters };

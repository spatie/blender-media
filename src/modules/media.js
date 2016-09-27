import { forIn, values } from 'lodash';
import { makeActions } from '../helpers';
import Vue from 'vue';

const state = {
    media: {},
};

export const mutations = {
    addMedia(state, { media }) {
        if (! Array.isArray(media)) {
            media = [media];
        }

        media.forEach(media => Vue.set(state.media, media.id, media));
    },
    renameMedia(state, { id, name }) {
        if(!state.media[id]) {
            return;
        }
        state.media[id].name = name;
    },
    markMediaForRemoval(state, { id }) {
        if(! state.media[id]) {
            return;
        }

        Vue.set(state.media[id], 'markedForRemoval', true);
    },
    markCollectionForRemoval(state, { collection }) {
        forIn(state.media, (media) => {
            if (media.collection === collection) {
                mutations.markMediaForRemoval(state, { id: media.id });
            }
        });
    },
    restoreMedia(state, { id }) {
        if(! state.media[id]) {
            return;
        }

        Vue.set(state.media[id], 'markedForRemoval', false);
    },
    replaceMedia(state, { collection, media }) {
        mutations.clearCollection(state, { collection });
        mutations.addMedia(state, { media });
    },
    clearCollection(state, { collection }) {
        forIn(state.media, (media, id) => {
            if (media.collection === collection) {
                Vue.delete(state.media, id);
            }
        });
    },
    setMediaOrder(state, { order }) {
        forIn(order, (order, mediaId) => {
            state.media[mediaId].orderColumn = order;
        });
    },
    updateCustomProperty(state, { id, property, value }) {
        if(! state.media[id]) {
            return;
        }

        const [ namespace, key ] = property.split('.');

        if (!key) {
            Vue.set(state.media[id].customProperties, namespace, value);
            return;
        }

        if (!state.media[id].customProperties[namespace]) {
            Vue.set(state.media[id].customProperties, namespace, {});
        }

        Vue.set(state.media[id].customProperties[namespace], key, value);
    },
};

export const actions = {
    ...makeActions(mutations),
};

export const getters = {
    allMedia: state => values(state.media),
};

export default { state, mutations, actions, getters };

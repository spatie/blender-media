import { findOrFail } from '../util';
import { forIn } from 'lodash';

const state = {
    media: [],
};

export const mutations = {
    addMedia(state, { media }) {
        if (! Array.isArray(media)) {
            media = [media];
        }
        state.media = state.media
            .filter(m => m.id === media.id)
            .concat(media);
    },

    renameMedia(state, { id, name }) {
        findOrFail(state.media, { id }).name = name;
    },

    markMediaForRemoval(state, { id }) {
        findOrFail(state.media, { id }).markedForRemoval = true;
    },

    markAllMediaForRemoval(state) {
        state.media.forEach((media) => {
            mutations.markMediaForRemoval(state, { id: media.id });
        });
    },

    restoreMedia(state, { id }) {
        findOrFail(state.media, { id }).markedForRemoval = false;
    },

    replaceMedia(state, { media }) {
        state.media = [];
        mutations.addMedia(state, { media });
    },

    setMediaOrder(state, { order }) {
        forIn(order, (order, mediaId) => {
            findOrFail(state.media, { id: parseInt(mediaId) }).orderColumn = order;
        });
    },

    updateCustomProperty(state, { id, property, value }) {
        const media = findOrFail(state.media, { id });
        const [namespace, key] = property.split('.');

        if (! key) {
            media.customProperties[namespace] = value;
            return;
        }

        if (! media.customProperties[namespace]) {
            media.customProperties[namespace] = {};
        }

        media.customProperties[namespace][key] = value;
    },
};

export default { state, mutations };

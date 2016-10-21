import { find, forIn } from 'lodash';

const state = {
    media: [],
};

function getMedia(state, id) {
    const media = find(state.media, { id });

    if (! media) {
        throw new Error(`Trying to retrieve media ${id} which doens't exist.`);
    }

    return media;
}

function getCollection(state, collection) {
    return state.media.filter(m => m.collection === collection);
}

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
        getMedia(state, id).name = name;
    },
    markMediaForRemoval(state, { id }) {
        getMedia(state, id).markedForRemoval = true;
    },
    markCollectionForRemoval(state, { collection }) {
        getCollection(state, collection).forEach((media) => {
            mutations.markMediaForRemoval(state, { id: media.id });
        });
    },
    restoreMedia(state, { id }) {
        getMedia(state, id).markedForRemoval = false;
    },
    replaceMedia(state, { collection, media }) {
        state.media = state.media.filter(m => m.collection !== collection);
        mutations.addMedia(state, { media });
    },
    setMediaOrder(state, { order }) {
        forIn(order, (order, mediaId) => {
            getMedia(state, parseInt(mediaId)).orderColumn = order;
        });
    },
    updateCustomProperty(state, { id, property, value }) {
        const media = getMedia(state, id);
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

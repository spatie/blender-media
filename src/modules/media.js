import { findOrFail } from '../util';
import { forIn } from 'lodash';
import { Store } from '../util';

export function createStore() {
    return new Store({
        media: [],
    });
}

export function addMedia(state, { media }) {
    if (! Array.isArray(media)) {
        media = [media];
    }
    state.media = state.media
        .filter(m => m.id === media.id)
        .concat(media);
}

export function renameMedia(state, { id, name }) {
    findOrFail(state.media, { id }).name = name;
}

export function markMediaForRemoval(state, { id }) {
    findOrFail(state.media, { id }).markedForRemoval = true;
}

export function markAllMediaForRemoval(state) {
    state.media.forEach((media) => {
        markMediaForRemoval(state, { id: media.id });
    });
}

export function restoreMedia(state, { id }) {
    findOrFail(state.media, { id }).markedForRemoval = false;
}

export function replaceMedia(state, { media }) {
    state.media = [];
    addMedia(state, { media });
}

export function setMediaOrder(state, { order }) {
    forIn(order, (order, mediaId) => {
        findOrFail(state.media, { id: parseInt(mediaId) }).orderColumn = order;
    });
}

export function updateCustomProperty(state, { id, property, value }) {
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
}

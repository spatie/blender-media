import { concat, reject } from 'lodash';

export const state = {
    media: [],
};

export const hydrate = ({ media }) => {
    state.media = concat(state.media, media);
};

export const addMedia = media => {
    state.media = concat(state.media, media);
};

export const removeMedia = media => {
    state.media = reject(state.media, m => m.id === media.id);
};

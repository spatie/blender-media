import { concat, forIn, reject } from 'lodash';
import Vue from 'vue';

export const state = {
    media: [],
    uploadCount: 1,
    uploads: {},
    errors: {},
};

export const hydrate = ({ media }) => {
    state.media = concat(state.media, media);
};

export const addMedia = media => {
    state.media.push(...media);
};

export const removeMedia = media => {
    state.media = reject(state.media, m => m.id === media.id);
};

export const setMediaOrder = order => {
    forIn(order, (order, mediaId) => {
        state.media.find(m => m.id === parseInt(mediaId)).order_column = order;
    });
};

export const startUpload = file => {
    file.uploadId = state.uploadCount++;

    Vue.set(state.uploads, file.uploadId, {
        id: file.uploadId,
        collection: file.collection,
        progress: 0,
    });
};

export const updateProgress = file => {
    state.uploads[file.uploadId].progress = file.upload.progress;
};

export const finishUpload = file => {
    Vue.delete(state.uploads, file.uploadId);
};

export const addError = (collection, error) => {
    Vue.set(state.errors, collection, error);
};

export const clearErrors = collection => {
    Vue.delete(state.errors, collection);
};

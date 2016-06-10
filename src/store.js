import { concat, reject } from 'lodash';
import Vue from 'vue';

export const state = {
    media: [],
    uploadCount: 1,
    uploads: {},
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

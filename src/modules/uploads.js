import { values } from 'lodash';
import Vue from 'vue';

const state = {
    uploads: [],
};

export const mutations = {
    startUpload(state, { id, name, collection }) {
        state.uploads.push({
            id,
            name,
            collection,
            progress: 0,
        });
    },
    updateUploadProgress(state, { id, progress }) {
        const upload = state.uploads.filter(upload => upload.id === id)[0];

        if (! upload) {
            return;
        }

        upload.progress = progress;
    },
    finishUpload(state, { id }) {
        state.uploads = state.uploads.filter(upload => upload.id !== id);
    },
};

export const getters = {
    allUploads: state => state.uploads,
};

export default { state, mutations, getters };

import { makeActions } from '../helpers';
import { values } from 'lodash';
import Vue from 'vue';

const state = {
    uploads: {},
};

export const mutations = {
    startUpload(state, { id, name, collection }) {
        Vue.set(state.uploads, id, {
            id,
            name,
            collection,
            progress: 0,
        });
    },
    updateUploadProgress(state, { id, progress }) {
        if (!state.uploads[id]) {
            return;
        }

        state.uploads[id].progress = progress;
    },
    finishUpload(state, { id }) {
        Vue.delete(state.uploads, id);
    },
};

export const actions = {
    ...makeActions(mutations),
};

export const getters = {
    allUploads: state => values(state.uploads),
};

export default { state, mutations, actions, getters };

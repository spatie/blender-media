import { values } from 'lodash';
import Vue from 'vue';

const state = {
    uploads: {},
};

export const mutations = {

    START_UPLOAD(state, id, name, collection) {

        Vue.set(state.uploads, id, {
            id,
            name,
            collection,
            progress: 0,
        });
    },

    UPDATE_UPLOAD_PROGRESS(state, id, progress) {

        if (!state.uploads[id]) return;

        state.uploads[id].progress = progress;
    },

    FINISH_UPLOAD(state, id) {
        Vue.delete(state.uploads, id);
    },

};

export const actions = {};

export const getters = {
    allUploads: state => values(state.uploads.uploads),
};

export default { state, mutations, actions, getters };

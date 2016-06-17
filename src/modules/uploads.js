import Vue from 'vue';

const state = {
    count: 1,
    uploads: {},
};

const mutations = {

    START_UPLOAD(state, id, collection) {

        state.count++;

        Vue.set(state.uploads, id, {
            id,
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

export default { state, mutations };

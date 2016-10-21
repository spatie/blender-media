import Vue from 'vue';

const state = {
    errors: {},
};

export const mutations = {
    addError(state, { collection, message }) {
        Vue.set(state.errors, collection, message);
    },

    clearErrors(state, { collection }) {
        Vue.delete(state.errors, collection);
    },
};

export default { state, mutations };

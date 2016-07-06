import Vue from 'vue';

const state = {
    errors: {},
};

export const mutations = {

    ADD_ERROR(state, collection, error) {
        Vue.set(state.errors, collection, error);
    },

    CLEAR_ERRORS(state, collection) {
        Vue.delete(state.errors, collection);
    },

};

export const actions = {};

export const getters = {
    allErrors: state => state.errors.errors,
};

export default { state, mutations };

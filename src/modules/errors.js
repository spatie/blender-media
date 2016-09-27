import { makeActions } from '../helpers';
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

export const actions = {
    ...makeActions(mutations),
};

export const getters = {
    allErrors: state => state.errors,
};

export default { state, mutations, actions, getters };

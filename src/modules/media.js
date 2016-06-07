const state = {
    collection: '',
    media: [],
};

const mutations = {

    HYDRATE(state, { collection, media }) {
        state.collection = collection;
        state.media = media;
    },

    ADD_MEDIA(state, { media }) {
        state.media.push(media);
    },

    REMOVE_MEDIA(state, { media }) {
        state.media = state.media.reject(m => m.id === media.id);
    },

};

export default { state, mutations };

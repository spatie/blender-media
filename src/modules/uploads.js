const state = {
    error: '',
    uploads: [],
};

export const mutations = {
    startUpload(state, { id, name }) {
        state.uploads.push({
            id,
            name,
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

    setError(state, { message }) {
        state.error = message;
    },

    clearError(state) {
        state.error = '';
    },
};

export default { state, mutations };

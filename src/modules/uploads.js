import { Store } from '../util';

export function createStore() {
    return new Store({
        error: '',
        uploads: [],
    });
}

export function startUpload(state, { id, name }) {
    state.uploads.push({
        id,
        name,
        progress: 0,
    });
}

export function updateUploadProgress(state, { id, progress }) {
    const upload = state.uploads.filter(upload => upload.id === id)[0];

    if (! upload) {
        return;
    }

    upload.progress = progress;
}

export function finishUpload(state, { id }) {
    state.uploads = state.uploads.filter(upload => upload.id !== id);
}

export function setError(state, { message }) {
    state.error = message;
}

export function clearError(state) {
    state.error = '';
}

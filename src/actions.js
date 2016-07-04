export const hydrate = ({ dispatch }, data) => {
    dispatch('HYDRATE', data);
};

export const renameMedia = ({ dispatch }, media, name) => {
    dispatch('RENAME_MEDIA', media, name);
};

export const updateMediaCustomProperty = ({ dispatch }, media, property, value) => {
    dispatch('UPDATE_CUSTOM_PROPERTY', media, property, value);
};

export const markMediaForRemoval = ({ dispatch }, media) => {
    dispatch('MARK_MEDIA_FOR_REMOVAL', media);
};

export const markCollectionForRemoval = ({ dispatch }, collection) => {
    dispatch('MARK_COLLECTION_FOR_REMOVAL', collection);
};

export const restoreMedia = ({ dispatch }, media) => {
    dispatch('RESTORE_MEDIA', media);
};

export const replaceMedia = ({ dispatch }, oldMedia, newMedia) => {
    dispatch('REPLACE_MEDIA', oldMedia, newMedia);
};

export const setMediaOrder = ({ dispatch }, order) => {
    dispatch('SET_MEDIA_ORDER', order);
};

export const clearErrors = ({ dispatch }, collection) => {
    dispatch('CLEAR_ERRORS', collection);
};

export const startUpload = ({ dispatch }, uploadId, name, collection) => {
    dispatch('START_UPLOAD', uploadId, name, collection);
};

export const updateUploadProgress = ({ dispatch }, uploadId, progress) => {
    dispatch('UPDATE_UPLOAD_PROGRESS', uploadId, progress);
};

export const addMedia = ({ dispatch }, media) => {
    dispatch('ADD_MEDIA', media);
};

export const addError = ({ dispatch }, collection, error) => {
    dispatch('ADD_ERROR', collection, error);
};

export const finishUpload = ({ dispatch }, uploadId) => {
    dispatch('FINISH_UPLOAD', uploadId);
};

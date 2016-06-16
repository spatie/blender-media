import { forIn } from 'lodash';
import Vue from 'vue';

/**
 * @type {Object}
 * @property {Object} media - Media objects keyed by id.
 * @property {number} uploadCount
 * @property {Object} uploads - Upload objects keyed by id.
 * @property {Object} errors - Error messages keyed by collection.
 */
export const state = {
    media: {},
    uploadCount: 1,
    uploads: {},
    errors: {},
};

/**
 * @param {Object} data
 * @param {Media[]} data.media
 */
export const hydrate = ({ media }) => {
    addMedia(media);
};

/**
 * @param {Media[]} media
 */
export const addMedia = media => {
    media.forEach(media => Vue.set(state.media, media.id, media));
};

/**
 * @param {Media} media
 */
export const removeMedia = media => {
    Vue.delete(state.media, media.id);
};

/**
 * @param {Object} order - An object with media id's as keys and order columns
 *                         as values.
 */
export const setMediaOrder = order => {
    forIn(order, (order, mediaId) => {
        state.media[mediaId].order_column = order;
    });
};

/**
 * @param {Object} file - A file object provided by Dropzone.js.
 */
export const startUpload = file => {

    file.uploadId = state.uploadCount++;

    Vue.set(state.uploads, file.uploadId, {
        id: file.uploadId,
        collection: file.collection,
        progress: 0,
    });
};

/**
 * @param {Object} file - A file object provided by Dropzone.js.
 */
export const updateProgress = file => {

    if (!state.uploads[file.uploadId]) return;

    state.uploads[file.uploadId].progress = file.upload.progress;
};

/**
 * @param {Object} file - A file object provided by Dropzone.js.
 */
export const finishUpload = file => {
    Vue.delete(state.uploads, file.uploadId);
};

/**
 * @param {string} collection
 * @param {string} error
 */
export const addError = (collection, error) => {
    Vue.set(state.errors, collection, {
        collection,
        error,
    });
};

/**
 * @param {string} collection
 */
export const clearErrors = collection => {
    Vue.delete(state.errors, collection);
};

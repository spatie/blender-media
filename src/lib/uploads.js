import { values } from 'lodash';

/**
 * @typedef {Object} Upload
 * @property {int} id
 * @property {int} progress
 * @property {string} collection
 */

/**
 * @param {Upload[]} uploads
 * @param {string} collection
 * @return {Upload}
 */
export const inCollection = (uploads, collection) => {
    return values(uploads).filter(u => u.collection === collection);
};

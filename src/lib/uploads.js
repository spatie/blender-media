import { values } from 'lodash';

/**
 * @typedef {Object} Upload
 * @property {number} id
 * @property {number} progress
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

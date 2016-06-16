import { includes, sortBy } from 'lodash';
import getClassNameForExtension from 'font-awesome-filetypes';

/**
 * @typedef {Object} Media
 * @property {number} id
 * @property {string} name
 * @property {string} file_name
 * @property {Object} custom_properties
 * @property {number} order_column
 * @property {string} thumbUrl
 * @property {string} originalUrl
 * @property {string} collection
 */

/**
 * @param {Media} media
 * @return {string}
 */
export const extension = media => {
    return media.file_name.split('.').pop().toLowerCase();
};

/**
 * @param {Media} media
 * @return {bool}
 */
export const isImage = media => {
    return includes(['jpg', 'jpeg', 'gif', 'png'], extension(media));
};

/**
 * @param {Media} media
 * @return {string}
 */
export const icon = media => {
    return getClassNameForExtension(extension(media));
};

/**
 * @param {Media[]} media
 * @return {Media[]}
 */
export const sort = media => {
    return sortBy(media, 'order_column');
};

/**
 * @param {Media[]} media
 * @param {string} collection
 * @return {Media[]}
 */
export const inCollection = (media, collection) => {
    return media.filter(m => m.collection === collection);
};

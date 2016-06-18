import BasicEditor from '../components/editors/basic';

/**
 * @typedef {Type}
 * @property {?string} accepts
 * @property {bool} multiple
 * @property {string} editor
 */

/**
 * @type {Object} - Types keyed by name.
 */
const types = {};

/**
 * @param {string} name
 * @param {Type} type
 */
export const registerType = (name, {
    accepts = null,
    multiple = true,
    editor = BasicEditor,
}) => {
    types[name] = {
        accepts,
        multiple,
        editor,
    };
};

/**
 * @param {string} name
 * @return {Type}
 */
export const getSettings = name => {

    if (!types[name]) {
        throw new Error(`Media component type \`${name}\` doesn't exist`);
    }

    return types[name];
};

/* Default types */

registerType('images', {
    accepts: '.jpg,.jpeg,.png,.gif,.svg',
});

registerType('image', {
    accepts: '.jpg,.jpeg,.png,.gif,.svg',
    multiple: false,
});

registerType('downloads', {});

registerType('download', {
    multiple: false,
});

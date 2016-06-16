import BasicEditor from './components/editors/basic';

/**
 * @type {Object} - Editors keyed by name.
 */
const editors = {};

/**
 * @param {string} name
 * @param {Object} component - A Vue component
 */
export const registerEditor = (name, component) => {
    editors[name] = component;
};

/**
 * @param {string} name
 * @return {Object}
 */
export const getEditor = name => {

    if (!editors.name) {
        throw new Error(`Media editor \`${name}\` doesn't exist`);
    }

    return editors[name];
};

/** Default editors */

registerEditor('basic', BasicEditor);

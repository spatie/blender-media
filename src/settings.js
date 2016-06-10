import BasicEditor from './components/editors/basic';


const editors = {};

export const registerEditor = (name, component) => {
    editors[name] = component;
};

registerEditor('basic', BasicEditor);


const types = {};

export const registerType = (name, {
    accepts = '*',
    multiple = true,
    editor = 'basic',
}) => {
    types[name] = {
        accepts,
        multiple,
        editor,
    };
};

registerType('images', {
    accepts: 'jpg,jpeg,png,gif,svg',
});

registerType('image', {
    accepts: 'jpg,jpeg,png,gif,svg',
    multiple: false,
});

registerType('downloads', {});

registerType('download', {
    multiple: false,
});


export const getSettings = name => {

    if (!types.hasOwnProperty(name)) {
        throw new Error(`Media component type \`${name}\` doesn't exist`);
    }

    return types[name];
};

export const getEditor = name => {

    if (!editors.hasOwnProperty(name)) {
        throw new Error(`Media editor \`${name}\` doesn't exist`);
    }

    return editors[name];
};

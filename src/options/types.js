import { assign } from 'lodash';

const types = {};

export const registerType = (name, {
    accepts = null,
    multiple = true,
    editor = 'basic',
}) => {
    types[name] = {
        accepts,
        multiple,
        editor,
    };
};

export const extendType = (name, options) => {
    assign(types[name], options);
};

export const getTypeOptions = name => {
    if (! types[name]) {
        throw new Error(`Media component type \`${name}\` doesn't exist`);
    }

    return types[name];
};

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

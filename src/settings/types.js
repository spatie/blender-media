const types = {};

export const registerType = (name, {
    extend = null,
    accepts = null,
    multiple = true,
    editor = 'basic',
}) => {
    types[name] = {
        ...(extend ? getTypeSettings(extend) : {}),
        accepts,
        multiple,
        editor,
    };
};

export const getTypeSettings = name => {
    if (! types[name]) {
        throw new Error(`Media component type \`${name}\` doesn't exist`);
    }

    return types[name];
};

registerType('images', {
    accepts: '.jpg,.jpeg,.png,.gif,.svg',
});

registerType('image', {
    extend: 'images',
    multiple: false,
});

registerType('downloads', {});

registerType('download', {
    extend: 'downloads',
    multiple: false,
});

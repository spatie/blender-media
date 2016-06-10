export const debug = (() => {
    return true;
})();

export const translate = key => {
    return key;
};

export const getError = xhr => {
    return xhr.responseText;
};

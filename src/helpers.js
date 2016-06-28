export const translate = key => {
    return key;
};

export const matches = (element, selector) => {

    if (element.matches) {
        return element.matches(selector);
    }

    if (element.msMatchesSelector) {
        return element.msMatchesSelector(selector);
    }

    throw new Error('`Element.matches` is not supported in this browser');
};

export const uniqueIdentifier = () => (
    `${(new Date()).getTime()}-${Math.floor(Math.random() * 100000)}`
);

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

export const pipe = (object, ...operations) => (
    operations.reduce((object, operation) => operation(object), object)
);

export const makeAction = (type) => {
    return ({ commit }, payload) => commit(type, payload);
};

export const makeActions = mutations => {
    return Object.keys(mutations).reduce((actions, type) => {
        return Object.defineProperty(actions, type, { 
            value: makeAction(type),
            enumerable: true,
        });
    }, {});
};

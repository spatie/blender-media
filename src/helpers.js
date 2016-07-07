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

export const makeAction = (type) => (
    ({ commit }, payload) => commit(type, payload)
);

export const makeActions = mutations => (
    Object.keys(mutations).reduce((actions, type) => {
        actions[type] = makeAction(type);
        return actions;
    }, {})
);

import { find } from 'lodash';

export function findOrFail(collection, query) {
    const result = find(collection, query);

    if (result === undefined) {
        throw new Error(`No results for query ${query} in collection ${collection}`);
    }

    return result;
}

export function pipe(object, ...operations) {
    return operations.reduce((object, operation) => operation(object), object);
}

export function matches(element, selector) {
    if (element.matches) {
        return element.matches(selector);
    }

    if (element.msMatchesSelector) {
        return element.msMatchesSelector(selector);
    }

    throw new Error('`Element.matches` is not supported in this browser');
}

export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

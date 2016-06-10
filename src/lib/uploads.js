import { values } from 'lodash';

export const inCollection = (uploads, collection) => {
    return values(uploads).filter(u => u.collection === collection);
};

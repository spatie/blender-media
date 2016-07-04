import { values } from 'lodash';

export const allMedia = state => values(state.media.media);

export const allUploads = state => values(state.uploads.uploads);

export const allErrors = state => state.errors.errors;

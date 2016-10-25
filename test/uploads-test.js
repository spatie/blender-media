import { assert } from 'chai';
import { findOrFail } from '../src/util';
import Uploads from '../src/modules/uploads';
import Vue from 'vue';

describe('uploads', () => {

    let store;

    beforeEach(() => store = new Vue(Uploads));

    describe('startUpload', () => {

        it('can start an upload', () => {

            store.startUpload(1, 'image.jpg');

            assert.lengthOf(store.uploads, 1);
            assert.equal(findOrFail(store.uploads, { id: 1 }).id, 1);
            assert.equal(findOrFail(store.uploads, { id: 1 }).name, 'image.jpg');
            assert.equal(findOrFail(store.uploads, { id: 1 }).progress, 0);
        });
    });

    describe('updateUploadProgress', () => {

        it('can update an upload\'s progress', () => {

            store.startUpload(1, 'image.jpg');
            store.updateUploadProgress(1, 50);

            assert.equal(findOrFail(store.uploads, { id: 1 }).progress, 50);
        });
    });

    describe('finishUpload', () => {

        it('can finish an upload', () => {

            store.startUpload(1, 'image.jpg');
            store.finishUpload(1);

            assert.lengthOf(store.uploads, 0);
        });
    });

    describe('setError', () => {

        it('can add an error', () => {

            store.setError('File too large');

            assert.equal(store.error, 'File too large');
        });

        it('only holds the last error', () => {

            store.setError('File too large');
            store.setError('Conversion error');

            assert.equal(store.error, 'Conversion error');
        });
    });

    describe('clearError', () => {

        it('can clear the error', () => {

            store.setError('File too large');
            store.clearError();

            assert.equal(store.error, '');
        });
    });
});

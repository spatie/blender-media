import { assert } from 'chai';
import { findOrFail } from '../src/util';
import * as uploads from '../src/modules/uploads';

describe('uploads', () => {

    let store;

    beforeEach(() => store = uploads.createStore());

    describe('startUpload', () => {

        it('can start an upload', () => {

            store.commit(uploads.startUpload, { id: 1, name: 'image.jpg' });

            assert.lengthOf(store.state.uploads, 1);
            assert.equal(findOrFail(store.state.uploads, { id: 1 }).id, 1);
            assert.equal(findOrFail(store.state.uploads, { id: 1 }).name, 'image.jpg');
            assert.equal(findOrFail(store.state.uploads, { id: 1 }).progress, 0);
        });
    });

    describe('updateUploadProgress', () => {

        it('can update an upload\'s progress', () => {

            store.commit(uploads.startUpload, { id: 1, name: 'image.jpg' });
            store.commit(uploads.updateUploadProgress, { id: 1, progress: 50 });

            assert.equal(findOrFail(store.state.uploads, { id: 1 }).progress, 50);
        });
    });

    describe('finishUpload', () => {

        it('can finish an upload', () => {

            store.commit(uploads.startUpload, { id: 1, name: 'image.jpg' });
            store.commit(uploads.finishUpload, { id: 1 });

            assert.lengthOf(store.state.uploads, 0);
        });
    });

    describe('setError', () => {

        it('can add an error', () => {

            store.commit(uploads.setError, { message: 'File too large' });

            assert.equal(store.state.error, 'File too large');
        });

        it('only holds the last error', () => {

            store.commit(uploads.setError, { message: 'File too large' });
            store.commit(uploads.setError, { message: 'Conversion error' });

            assert.equal(store.state.error, 'Conversion error');
        });
    });

    describe('clearError', () => {

        it('can clear the error', () => {

            store.commit(uploads.setError, { message: 'File too large' });
            store.commit(uploads.clearError);

            assert.equal(store.state.error, '');
        });
    });
});

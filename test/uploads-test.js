import { assert } from 'chai';
import { findOrFail } from '../src/util';
import { mutations } from '../src/modules/uploads';

describe('uploads', () => {

    describe('mutations', () => {

        describe('startUpload', () => {

            it('can start an upload', () => {

                const state = { uploads: [] };

                mutations.startUpload(state, { id: 1, name: 'image.jpg', collection: 'images' });

                assert.lengthOf(state.uploads, 1);
                assert.equal(findOrFail(state.uploads, { id: 1 }).id, 1);
                assert.equal(findOrFail(state.uploads, { id: 1 }).name, 'image.jpg');
                assert.equal(findOrFail(state.uploads, { id: 1 }).collection, 'images');
                assert.equal(findOrFail(state.uploads, { id: 1 }).progress, 0);
            });

        });

        describe('updateUploadProgress', () => {

            it('can update an upload\'s progress', () => {

                const state = { uploads: [] };

                mutations.startUpload(state, { id: 1, name: 'image.jpg', collection: 'images' });
                mutations.updateUploadProgress(state, { id: 1, progress: 50 });

                assert.equal(findOrFail(state.uploads, { id: 1 }).progress, 50);
            });
        });

        describe('finishUpload', () => {

            it('can finish an upload', () => {

                const state = { uploads: [] };

                mutations.startUpload(state, { id: 1, name: 'image.jpg', collection: 'images' });
                mutations.finishUpload(state, { id: 1 });

                assert.lengthOf(state.uploads, 0);
            });
        });
    });
});

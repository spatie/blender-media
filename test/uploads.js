import { getters, mutations } from '../src/modules/uploads';
import { assert } from 'chai';
import { values } from 'lodash';

describe('uploads', () => {

    describe('mutations', () => {

        describe('startUpload', () => {

            it('can start an upload', () => {

                const state = { uploads: {} };

                mutations.startUpload(state, { id: 1, name: 'image.jpg', collection: 'images' });

                assert.lengthOf(values(state.uploads), 1);
                assert.equal(state.uploads[1].id, 1);
                assert.equal(state.uploads[1].name, 'image.jpg');
                assert.equal(state.uploads[1].collection, 'images');
                assert.equal(state.uploads[1].progress, 0);
            });

        });

        describe('updateUploadProgress', () => {

            it('can update an upload\'s progress', () => {

                const state = { uploads: {} };

                mutations.startUpload(state, { id: 1, name: 'image.jpg', collection: 'images' });
                mutations.updateUploadProgress(state, { id: 1, progress: 50 });

                assert.equal(state.uploads[1].progress, 50);
            });
        });

        describe('finishUpload', () => {

            it('can finish an upload', () => {

                const state = { uploads: {} };

                mutations.startUpload(state, { id: 1, name: 'image.jpg', collection: 'images' });
                mutations.finishUpload(state, { id: 1 });

                assert.lengthOf(values(state.uploads), 0);
            });
        });
    });

    describe('getters', () => {

        describe('all', () => {

            it('can get all uploads', () => {

                const state = { uploads: { 1: { id: 1 }, 2: { id: 2 } } };

                const allUploads = getters.allUploads(state);

                assert.lengthOf(allUploads, 2);
                assert.equal(allUploads[0].id, 1);
                assert.equal(allUploads[1].id, 2);

            });
        });
    });
});

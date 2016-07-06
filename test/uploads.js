import { getters, mutations } from '../src/modules/uploads';
import { assert } from 'chai';
import { values } from 'lodash';

describe('uploads', () => {

    describe('mutations', () => {

        describe('START_UPLOAD', () => {

            it('can start an upload', () => {

                const state = { uploads: {} };

                mutations.START_UPLOAD(state, 1, 'image.jpg', 'images');

                assert.lengthOf(values(state.uploads), 1);
                assert.equal(state.uploads[1].id, 1);
                assert.equal(state.uploads[1].name, 'image.jpg');
                assert.equal(state.uploads[1].collection, 'images');
                assert.equal(state.uploads[1].progress, 0);
            });

        });

        describe('UPDATE_UPLOAD_PROGRESS', () => {

            it('can update an upload\'s progress', () => {

                const state = { uploads: {} };

                mutations.START_UPLOAD(state, 1, 'images');
                mutations.UPDATE_UPLOAD_PROGRESS(state, 1, 50);

                assert.equal(state.uploads[1].progress, 50);
            });
        });

        describe('FINISH_UPLOAD', () => {

            it('can finish an upload', () => {

                const state = { uploads: {} };

                mutations.START_UPLOAD(state, 1, 'images');
                mutations.FINISH_UPLOAD(state, 1);

                assert.lengthOf(values(state.uploads), 0);
            });
        });
    });

    describe('getters', () => {

        describe('all', () => {

            it('can get all uploads', () => {

                const state = { uploads: { 1: { id: 1 }, 2: { id: 2 } } };

                const allUploads = getters.all(state);

                assert.lengthOf(allUploads, 2);
                assert.equal(allUploads[0].id, 1);
                assert.equal(allUploads[1].id, 2);

            });
        });
    });
});

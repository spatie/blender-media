import { assert } from 'chai';
import { mutations } from '../src/modules/uploads';
import { values } from 'lodash';

describe('uploads', () => {

    describe('START_UPLOAD', () => {

        it('can start an upload', () => {

            const state = { count: 1, uploads: {} };

            mutations.START_UPLOAD(state, 1, 'image.jpg', 'images');

            assert.lengthOf(values(state.uploads), 1);
            assert.equal(state.uploads[1].id, 1);
            assert.equal(state.uploads[1].name, 'image.jpg');
            assert.equal(state.uploads[1].collection, 'images');
            assert.equal(state.uploads[1].progress, 0);
        });

        it('increments the upload count after adding an upload', () => {

            const state = { count: 1, uploads: {} };

            mutations.START_UPLOAD(state, 1, 'images');

            assert.equal(state.count, 2);
        });
    });

    describe('UPDATE_UPLOAD_PROGRESS', () => {

        it('can update an upload\'s progress', () => {

            const state = { count: 1, uploads: {} };

            mutations.START_UPLOAD(state, 1, 'images');
            mutations.UPDATE_UPLOAD_PROGRESS(state, 1, 50);

            assert.equal(state.uploads[1].progress, 50);
        });
    });

    describe('FINISH_UPLOAD', () => {

        it('can finish an upload', () => {

            const state = { count: 1, uploads: {} };

            mutations.START_UPLOAD(state, 1, 'images');
            mutations.FINISH_UPLOAD(state, 1);

            assert.lengthOf(values(state.uploads), 0);
        });
    });
});

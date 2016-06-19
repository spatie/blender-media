import { assert } from 'chai';
import { mutations } from '../src/modules/errors';
import { values } from 'lodash';

describe('errors', () => {

    describe('ADD_ERROR', () => {

        it('can add an error for a collection', () => {

            const state = { errors: {} };

            mutations.ADD_ERROR(state, 'images', 'File too large');

            assert.lengthOf(values(state.errors), 1);
            assert.equal(state.errors['images'], 'File too large');
        });

        it('only holds the last error per collection', () => {

            const state = { errors: {} };

            mutations.ADD_ERROR(state, 'images', 'File too large');
            mutations.ADD_ERROR(state, 'images', 'Conversion error');

            assert.lengthOf(values(state.errors), 1);
            assert.equal(state.errors['images'], 'Conversion error');
        });
    });

    describe('CLEAR_ERRORS', () => {

        it('can clear all errors for a collection', () => {

            const state = { errors: {} };

            mutations.ADD_ERROR(state, 'images', 'File too large');

            mutations.CLEAR_ERRORS(state, 'images');

            assert.lengthOf(values(state.errors), 0);
        });
    });
});

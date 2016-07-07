import { getters, mutations } from '../src/modules/errors';
import { assert } from 'chai';
import { values } from 'lodash';

describe('errors', () => {

    describe('mutations', () => {

        describe('addError', () => {

            it('can add an error for a collection', () => {

                const state = { errors: {} };

                mutations.addError(state, { collection: 'images', message: 'File too large'});

                assert.lengthOf(values(state.errors), 1);
                assert.equal(state.errors['images'], 'File too large');
            });

            it('only holds the last error per collection', () => {

                const state = { errors: {} };

                mutations.addError(state, { collection: 'images', message: 'File too large' });
                mutations.addError(state, { collection: 'images', message: 'Conversion error' });

                assert.lengthOf(values(state.errors), 1);
                assert.equal(state.errors['images'], 'Conversion error');
            });
        });

        describe('clearErrors', () => {

            it('can clear all errors for a collection', () => {

                const state = { errors: {} };

                mutations.addError(state, 'images', 'File too large');

                mutations.clearErrors(state, 'images');

                assert.lengthOf(values(state.errors), 0);
            });
        });
    });

    describe('getters', () => {

        describe('all', () => {

            it('can get all errors', () => {

                const state = { errors: { images: 'Foo', downloads: 'Bar' } };

                const allErrors = getters.allErrors(state);

                assert.equal(allErrors.images, 'Foo');
                assert.equal(allErrors.downloads, 'Bar');

            });
        });
    });
});

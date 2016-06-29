import * as getters from '../src/getters';
import { assert } from 'chai';

describe('getters', () => {

    describe('allMedia', () => {

        it('can get all media', () => {

            const state = { media: { media: { 1: { id: 1 }, 2: { id: 2 } } } };

            const allMedia = getters.allMedia(state);

            assert.lengthOf(allMedia, 2);
            assert.equal(allMedia[0].id, 1);
            assert.equal(allMedia[1].id, 2);

        });

    });

    describe('allUploads', () => {

        it('can get all uploads', () => {

            const state = { uploads: { uploads: { 1: { id: 1 }, 2: { id: 2 } } } };

            const allUploads = getters.allUploads(state);

            assert.lengthOf(allUploads, 2);
            assert.equal(allUploads[0].id, 1);
            assert.equal(allUploads[1].id, 2);

        });

    });

    describe('allErrors', () => {

        it('can get all errors', () => {

            const state = { errors: { errors: { images: 'Foo', downloads: 'Bar' } } };

            const allErrors = getters.allErrors(state);

            assert.equal(allErrors.images, 'Foo');
            assert.equal(allErrors.downloads, 'Bar');

        });

    });
});

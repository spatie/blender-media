import { assert } from 'chai';
import { mutations } from '../src/modules/media';
import { values } from 'lodash';

const createMedia = id => ({
    id: id,
    name: `image_${id}`,
    file_name: `image_${id}.jpeg`,
    custom_properties: [],
    order_column: id,
    thumbUrl: `/media/image_${id}.jpeg`,
    originalUrl: `/media/image_${id}.jpeg`,
    collection: 'images',
});

describe('media', () => {

    describe('ADD_MEDIA', () => {

        it('can add a single media item', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);

            assert.lengthOf(values(state.media), 1);
            assert.equal(state.media[1], media);
        });

        it('can add an array of media items', () => {

            const state = { media: {} };
            const media1 = createMedia(1);
            const media2 = createMedia(2);

            mutations.ADD_MEDIA(state, [media1, media2]);

            assert.lengthOf(values(state.media), 2);
            assert.equal(state.media[1], media1);
            assert.equal(state.media[2], media2);
        });

        it('can\'t add multiple media items with the same ids', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);
            mutations.ADD_MEDIA(state, media);

            assert.lengthOf(values(state.media), 1);
        });

    });

    describe('RENAME_MEDIA', () => {

        it('can rename a media item', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);

            mutations.RENAME_MEDIA(state, media, 'image_renamed');

            assert.equal(state.media[1].name, 'image_renamed');
        });
    });

    describe('REMOVE_MEDIA', () => {

        it('can remove a media item', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);

            mutations.REMOVE_MEDIA(state, media);

            assert.lengthOf(values(state.media), 0);
        });
    });

    describe('SET_MEDIA_ORDER', () => {

        it('can reorder media', () => {

            const state = { media: {} };
            const media1 = createMedia(1);
            const media2 = createMedia(2);

            mutations.ADD_MEDIA(state, [media1, media2]);

            mutations.SET_MEDIA_ORDER(state, { 1: 1, 2: 0 });

            assert.equal(state.media[1].order_column, 1);
            assert.equal(state.media[2].order_column, 0);
        });
    });

    describe('UPDATE_CUSTOM_PROPERTY', () => {

        it('can set a new custom property', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);

            mutations.UPDATE_CUSTOM_PROPERTY(state, media, 'foo', 'bar');

            assert.equal(state.media[1].custom_properties.foo, 'bar');
        });

        it('can set a nested custom property up to one level deep', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);

            mutations.UPDATE_CUSTOM_PROPERTY(state, media, 'foo.bar', 'baz');

            assert.equal(state.media[1].custom_properties.foo.bar, 'baz');
        });

        it('can update an existing custom property', () => {

            const state = { media: {} };
            const media = createMedia(1);

            media.custom_properties = { foo: 'bar' };

            mutations.ADD_MEDIA(state, media);

            mutations.UPDATE_CUSTOM_PROPERTY(state, media, 'foo', 'baz');

            assert.equal(state.media[1].custom_properties.foo, 'baz');
        });
    });
});

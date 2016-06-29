import { assert } from 'chai';
import { mutations } from '../src/modules/media';
import { values } from 'lodash';

const createMedia = id => ({
    id: id,
    name: `image_${id}`,
    fileName: `image_${id}.jpeg`,
    customProperties: [],
    orderColumn: id,
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

    describe('MARK_MEDIA_FOR_REMOVAL', () => {

        it('can mark a media item for removal', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);

            mutations.MARK_MEDIA_FOR_REMOVAL(state, media);

            assert.isTrue(state.media[1].markedForRemoval);
        });
    });

    describe('MARK_COLLECTION_FOR_REMOVAL', () => {

        it('can mark an entire collection for delete', () => {

            const state = { media: { 1: createMedia(1), 2: createMedia(2) } };

            mutations.MARK_COLLECTION_FOR_REMOVAL(state, 'images');

            assert.isTrue(state.media[1].markedForRemoval);
            assert.isTrue(state.media[2].markedForRemoval);
        });

    });

    describe('RESTORE_MEDIA', () => {

        it('can restore a media item that\'s marked for removal', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);

            mutations.MARK_MEDIA_FOR_REMOVAL(state, media);
            mutations.RESTORE_MEDIA(state, media);

            assert.isFalse(state.media[1].markedForRemoval);
        });
    });

    describe('REPLACE_MEDIA', () => {

        it('can replace an existing media item with a new item', () => {

            const state = { media: {} };

            const oldMedia = createMedia(1);
            const newMedia = createMedia(2);

            mutations.ADD_MEDIA(state, oldMedia);
            mutations.REPLACE_MEDIA(state, 'images', newMedia);

            assert.lengthOf(values(state.media), 1);
            assert.equal(state.media[2].id, 2);
        });

    });

    describe('SET_MEDIA_ORDER', () => {

        it('can reorder media', () => {

            const state = { media: {} };
            const media1 = createMedia(1);
            const media2 = createMedia(2);

            mutations.ADD_MEDIA(state, [media1, media2]);

            mutations.SET_MEDIA_ORDER(state, { 1: 1, 2: 0 });

            assert.equal(state.media[1].orderColumn, 1);
            assert.equal(state.media[2].orderColumn, 0);
        });
    });

    describe('CLEAR_COLLECTION', () => {

        it('can clear the media from a collection', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);

            mutations.CLEAR_COLLECTION(state, 'images');

            assert.lengthOf(values(state.media), 0);
        });

    });

    describe('UPDATE_CUSTOM_PROPERTY', () => {

        it('can set a new custom property', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);

            mutations.UPDATE_CUSTOM_PROPERTY(state, media, 'foo', 'bar');

            assert.equal(state.media[1].customProperties.foo, 'bar');
        });

        it('can set a nested custom property up to one level deep', () => {

            const state = { media: {} };
            const media = createMedia(1);

            mutations.ADD_MEDIA(state, media);

            mutations.UPDATE_CUSTOM_PROPERTY(state, media, 'foo.bar', 'baz');

            assert.equal(state.media[1].customProperties.foo.bar, 'baz');
        });

        it('can update an existing custom property', () => {

            const state = { media: {} };
            const media = createMedia(1);

            media.customProperties = { foo: 'bar' };

            mutations.ADD_MEDIA(state, media);

            mutations.UPDATE_CUSTOM_PROPERTY(state, media, 'foo', 'baz');

            assert.equal(state.media[1].customProperties.foo, 'baz');
        });
    });
});

import { assert } from 'chai';
import { find } from 'lodash';
import { mutations } from '../src/modules/media';

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

function getMedia(state, id) {
    const media = find(state.media, { id });

    if (! media) {
        throw new Error(`Trying to retrieve media ${id} which doens't exist.`);
    }

    return media;
}

describe('media', () => {

    describe('mutations', () => {

        describe('addMedia', () => {

            it('can add a single media item', () => {

                const state = { media: [] };
                const media = createMedia(1);

                mutations.addMedia(state, { media });

                assert.lengthOf(state.media, 1);
                assert.equal(getMedia(state, 1), media);
            });

            it('can add an array of media items', () => {

                const state = { media: [] };
                const media1 = createMedia(1);
                const media2 = createMedia(2);

                mutations.addMedia(state, { media: [media1, media2] });

                assert.lengthOf(state.media, 2);
                assert.equal(getMedia(state, 1), media1);
                assert.equal(state.media[1], media2);
            });

            it('can\'t add multiple media items with the same ids', () => {

                const state = { media: [] };
                const media = createMedia(1);

                mutations.addMedia(state, { media });
                mutations.addMedia(state, { media });

                assert.lengthOf(state.media, 1);
            });

        });

        describe('renameMedia', () => {

            it('can rename a media item', () => {

                const state = { media: [] };
                const media = createMedia(1);

                mutations.addMedia(state, { media });

                mutations.renameMedia(state, { id: media.id, name: 'image_renamed' });

                assert.equal(getMedia(state, 1).name, 'image_renamed');
            });
        });

        describe('markMediaForRemoval', () => {

            it('can mark a media item for removal', () => {

                const state = { media: [] };
                const media = createMedia(1);

                mutations.addMedia(state, { media });

                mutations.markMediaForRemoval(state, { id: media.id });

                assert.isTrue(state.media[0].markedForRemoval);
            });
        });

        describe('markCollectionForRemoval', () => {

            it('can mark an entire collection for removal', () => {

                const state = { media: [createMedia(1), createMedia(2)] };

                mutations.markCollectionForRemoval(state, { collection: 'images' });

                assert.isTrue(getMedia(state, 1).markedForRemoval);
                assert.isTrue(getMedia(state, 2).markedForRemoval);
            });

        });

        describe('restoreMedia', () => {

            it('can restore a media item that\'s marked for removal', () => {

                const state = { media: [] };
                const media = createMedia(1);

                mutations.addMedia(state, { media });
                mutations.markMediaForRemoval(state, { id: media.id });
                mutations.restoreMedia(state, { id: media.id });

                assert.isFalse(state.media[0].markedForRemoval);
            });
        });

        describe('replaceMedia', () => {

            it('can replace an existing media item with a new item', () => {

                const state = { media: [] };

                const oldMedia = createMedia(1);
                const newMedia = createMedia(2);

                mutations.addMedia(state, { media: oldMedia });
                mutations.replaceMedia(state, { collection: 'images', media: newMedia });

                assert.lengthOf(state.media, 1);

                // Will throw if id 2 doesn't exist
                getMedia(state, 2);
            });

        });

        describe('setMediaOrder', () => {

            it('can reorder media', () => {

                const state = { media: [] };
                const media1 = createMedia(1);
                const media2 = createMedia(2);

                mutations.addMedia(state, { media: [media1, media2] });
                mutations.setMediaOrder(state, { order: { 1: 1, 2: 0 } });

                assert.equal(getMedia(state, 1).orderColumn, 1);
                assert.equal(getMedia(state, 2).orderColumn, 0);
            });
        });

        describe('updateCustomProperty', () => {

            it('can set a new custom property', () => {

                const state = { media: [] };
                const media = createMedia(1);

                mutations.addMedia(state, { media });

                mutations.updateCustomProperty(state, { id: media.id, property: 'foo', value: 'bar' });

                assert.equal(getMedia(state, 1).customProperties.foo, 'bar');
            });

            it('can set a nested custom property up to one level deep', () => {

                const state = { media: [] };
                const media = createMedia(1);

                mutations.addMedia(state, { media });

                mutations.updateCustomProperty(state, { id: media.id, property: 'foo.bar', value: 'baz' });

                assert.equal(getMedia(state, 1).customProperties.foo.bar, 'baz');
            });

            it('can update an existing custom property', () => {

                const state = { media: [] };
                const media = createMedia(1);

                media.customProperties = { foo: 'bar' };

                mutations.addMedia(state, { media });

                mutations.updateCustomProperty(state, { id: media.id, property: 'foo', value: 'baz' });

                assert.equal(getMedia(state, 1).customProperties.foo, 'baz');
            });
        });
    });
});

import { assert } from 'chai';
import { findOrFail } from '../src/util';
import * as media from '../src/modules/media';

const createMediaItem = id => ({
    id: id,
    name: `image_${id}`,
    fileName: `image_${id}.jpeg`,
    customProperties: [],
    orderColumn: id,
    thumbUrl: `/media/image_${id}.jpeg`,
    originalUrl: `/media/image_${id}.jpeg`,
});

describe('media', () => {

    let store;

    beforeEach(() => store = media.createStore());

    describe('addMedia', () => {

        it('can add a single media item', () => {

            const mediaItem = createMediaItem(1);

            store.commit(media.addMedia, { media: mediaItem });

            assert.lengthOf(store.state.media, 1);
            assert.equal(findOrFail(store.state.media, { id: 1 }), mediaItem);
        });

        it('can add an array of media items', () => {

            const mediaItem1 = createMediaItem(1);
            const mediaItem2 = createMediaItem(2);

            store.commit(media.addMedia, { media: [mediaItem1, mediaItem2] });

            assert.lengthOf(store.state.media, 2);
            assert.equal(findOrFail(store.state.media, { id: 1 }), mediaItem1);
            assert.equal(store.state.media[1], mediaItem2);
        });

        it('can\'t add multiple media items with the same ids', () => {

            const mediaItem = createMediaItem(1);

            store.commit(media.addMedia, { media: mediaItem });
            store.commit(media.addMedia, { media: mediaItem });

            assert.lengthOf(store.state.media, 1);
        });

    });

    describe('renameMedia', () => {

        it('can rename a media item', () => {

            const mediaItem = createMediaItem(1);

            store.commit(media.addMedia, { media: mediaItem });
            store.commit(media.renameMedia, { id: mediaItem.id, name: 'image_renamed' });

            assert.equal(findOrFail(store.state.media, { id: 1 }).name, 'image_renamed');
        });
    });

    describe('markMediaForRemoval', () => {

        it('can mark a media item for removal', () => {

            const mediaItem = createMediaItem(1);

            store.commit(media.addMedia, { media: mediaItem });
            store.commit(media.markMediaForRemoval, { id: mediaItem.id });

            assert.isTrue(store.state.media[0].markedForRemoval);
        });
    });

    describe('markAllMediaForRemoval', () => {

        it('can mark an entire set for removal', () => {

            store.commit(media.addMedia, { media: [createMediaItem(1), createMediaItem(2)] });
            store.commit(media.markAllMediaForRemoval);

            assert.isTrue(findOrFail(store.state.media, { id: 1 }).markedForRemoval);
            assert.isTrue(findOrFail(store.state.media, { id: 2 }).markedForRemoval);
        });

    });

    describe('restoreMedia', () => {

        it('can restore a media item that\'s marked for removal', () => {

            const mediaItem = createMediaItem(1);

            store.commit(media.addMedia, { media: mediaItem });
            store.commit(media.markMediaForRemoval, { id: mediaItem.id });
            store.commit(media.restoreMedia, { id: mediaItem.id });

            assert.isFalse(store.state.media[0].markedForRemoval);
        });
    });

    describe('replaceMedia', () => {

        it('can replace an existing media item with a new item', () => {

            const oldItems = createMediaItem(1);
            const newItems = createMediaItem(2);

            store.commit(media.addMedia, { media: oldItems });
            store.commit(media.replaceMedia, { media: newItems });

            assert.lengthOf(store.state.media, 1);

            // Will throw if id 2 doesn't exist
            findOrFail(store.state.media, { id: 2 });
        });

    });

    describe('setMediaOrder', () => {

        it('can reorder media', () => {

            const mediaItem1 = createMediaItem(1);
            const mediaItem2 = createMediaItem(2);

            store.commit(media.addMedia, { media: [mediaItem1, mediaItem2] });
            store.commit(media.setMediaOrder, { order: { 1: 1, 2: 0 } });

            assert.equal(findOrFail(store.state.media, { id: 1 }).orderColumn, 1);
            assert.equal(findOrFail(store.state.media, { id: 2 }).orderColumn, 0);
        });
    });

    describe('updateCustomProperty', () => {

        it('can set a new custom property', () => {

            const mediaItem = createMediaItem(1);

            store.commit(media.addMedia, { media: mediaItem });
            store.commit(media.updateCustomProperty, { id: mediaItem.id, property: 'foo', value: 'bar' });

            assert.equal(findOrFail(store.state.media, { id: 1 }).customProperties.foo, 'bar');
        });

        it('can set a nested custom property up to one level deep', () => {

            const mediaItem = createMediaItem(1);

            store.commit(media.addMedia, { media: mediaItem });
            store.commit(media.updateCustomProperty, { id: mediaItem.id, property: 'foo.bar', value: 'baz' });

            assert.equal(findOrFail(store.state.media, { id: 1 }).customProperties.foo.bar, 'baz');
        });

        it('can update an existing custom property', () => {

            const mediaItem = createMediaItem(1);

            media.customProperties = { foo: 'bar' };

            store.commit(media.addMedia, { media: mediaItem });
            store.commit(media.updateCustomProperty, { id: mediaItem.id, property: 'foo', value: 'baz' });

            assert.equal(findOrFail(store.state.media, { id: 1 }).customProperties.foo, 'baz');
        });
    });
});

import { assert } from 'chai';
import Media from '../src/modules/media';
import Vue from 'vue';

const createMedia = id => ({
    id: id,
    name: `image_${id}`,
    fileName: `image_${id}.jpeg`,
    customProperties: {},
    orderColumn: id,
    thumbUrl: `/media/image_${id}.jpeg`,
    originalUrl: `/media/image_${id}.jpeg`,
});

describe('media', () => {

    let store;

    beforeEach(() => store = new Vue(Media));

    describe('addMedia', () => {

        it('can add a single media item', () => {

            const media = createMedia(1);

            store.addMedia(media);

            assert.lengthOf(store.media, 1);
            assert.deepEqual(store.find(1), { ...media, markedForRemoval: false });
        });

        it('can add an array of media items', () => {

            const media1 = createMedia(1);
            const media2 = createMedia(2);

            store.addMedia([media1, media2]);

            assert.lengthOf(store.media, 2);
            assert.deepEqual(store.find(1), { ...media1, markedForRemoval: false });
            assert.deepEqual(store.find(2), { ...media2, markedForRemoval: false });
        });
    });

    describe('markMediaForRemoval', () => {

        it('can mark a media item for removal', () => {

            const media = createMedia(1);

            store.addMedia(media);
            store.markMediaForRemoval(media.id);

            assert.isTrue(store.media[0].markedForRemoval);
        });
    });

    describe('markAllMediaForRemoval', () => {

        it('can mark an entire set for removal', () => {

            store.addMedia([createMedia(1), createMedia(2)]);
            store.markAllMediaForRemoval();

            assert.isTrue(store.find(1).markedForRemoval);
            assert.isTrue(store.find(2).markedForRemoval);
        });

    });

    describe('restoreMedia', () => {

        it('can restore a media item that\'s marked for removal', () => {

            const media = createMedia(1);

            store.addMedia(media);
            store.markMediaForRemoval(media.id);
            store.restoreMedia(media.id);

            assert.isFalse(store.media[0].markedForRemoval);
        });
    });

    describe('replaceMedia', () => {

        it('can replace an existing media item with a new item', () => {

            const oldMedia = createMedia(1);
            const newMedia = createMedia(2);

            store.addMedia(oldMedia);
            store.replaceMedia(newMedia);

            assert.lengthOf(store.media, 1);

            // Will throw if id 2 doesn't exist
            store.find(2);
        });

    });

    describe('setNewOrder', () => {

        it('can reorder media', () => {

            const media1 = createMedia(1);
            const media2 = createMedia(2);

            store.addMedia([media1, media2]);
            store.setNewOrder({ 1: 1, 2: 0 });

            assert.equal(store.find(1).orderColumn, 1);
            assert.equal(store.find(2).orderColumn, 0);
        });
    });

    describe('updateCustomProperty', () => {

        it('can set a new custom property', () => {

            const media = createMedia(1);

            store.addMedia(media);
            store.updateCustomProperty(media.id, 'foo', 'bar');

            assert.equal(store.find(1).customProperties.foo, 'bar');
        });

        it('can set a nested custom property up to one level deep', () => {

            const media = createMedia(1);

            store.addMedia(media);
            store.updateCustomProperty(media.id, 'foo.bar', 'baz');

            assert.equal(store.find(1).customProperties.foo.bar, 'baz');
        });

        it('can update an existing custom property', () => {

            const media = createMedia(1);

            media.customProperties = { foo: 'bar' };

            store.addMedia(media);
            store.updateCustomProperty(media.id, 'foo', 'baz');

            assert.equal(store.find(1).customProperties.foo, 'baz');
        });
    });
});

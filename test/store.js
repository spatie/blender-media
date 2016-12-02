// TODO: Refactor tests to test the Media component instead

import { assert } from 'chai';
import { findOrFail } from '../src/lib/util';

const createMedia = id => ({
    id: id,
    name: `image_${id}`,
    fileName: `image_${id}.jpeg`,
    customProperties: {},
    orderColumn: id,
    thumbUrl: `/media/image_${id}.jpeg`,
    originalUrl: `/media/image_${id}.jpeg`,
});

describe('Store', () => {

    let store;

    beforeEach(() => store = createStore());

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

    describe('markAllMediaForRemoval', () => {

        it('can mark an entire set for removal', () => {

            store.addMedia([createMedia(1), createMedia(2)]);
            store.markAllMediaForRemoval();

            assert.isTrue(store.find(1).markedForRemoval);
            assert.isTrue(store.find(2).markedForRemoval);
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

    describe('startUpload', () => {

        it('can start an upload', () => {

            store.startUpload(1, 'image.jpg');

            assert.lengthOf(store.uploads, 1);
            assert.equal(findOrFail(store.uploads, { id: 1 }).id, 1);
            assert.equal(findOrFail(store.uploads, { id: 1 }).name, 'image.jpg');
            assert.equal(findOrFail(store.uploads, { id: 1 }).progress, 0);
        });
    });

    describe('updateUploadProgress', () => {

        it('can update an upload\'s progress', () => {

            store.startUpload(1, 'image.jpg');
            store.updateUploadProgress(1, 50);

            assert.equal(findOrFail(store.uploads, { id: 1 }).progress, 50);
        });
    });

    describe('finishUpload', () => {

        it('can finish an upload', () => {

            store.startUpload(1, 'image.jpg');
            store.finishUpload(1);

            assert.lengthOf(store.uploads, 0);
        });
    });

    describe('setError', () => {

        it('can add an error', () => {

            store.setError('File too large');

            assert.equal(store.error, 'File too large');
        });

        it('only holds the last error', () => {

            store.setError('File too large');
            store.setError('Conversion error');

            assert.equal(store.error, 'Conversion error');
        });
    });

    describe('clearError', () => {

        it('can clear the error', () => {

            store.setError('File too large');
            store.clearError();

            assert.equal(store.error, '');
        });
    });
});

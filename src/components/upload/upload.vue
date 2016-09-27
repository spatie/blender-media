<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import Dropzone from 'dropzone';
import translate from '../../translations';
import { uniqueIdentifier } from '../../helpers';

export default {

    props: [
        'collection',
        'model',
        'url',
        'multiple',
        'accepts',
    ],

    mounted() {

        this.dropzone = new Dropzone(this.el, {
            url: this.url,
            uploadMultiple: this.multiple,
            acceptedFiles: this.accepts,
            parallelUploads: 10,
            clickable: this.el.querySelector('.js-add-media'),

            previewsContainer: false,
            previewTemplate: false,

            dictInvalidFileType: translate('errors.acceptFileTypes'),
            dictFileTooBig: translate('errors.maxFileSize'),
            dictResponseError: translate('errors.fail'),
        });

        // For some odd reason `bind` is necessary, arrow functions aren't working.

        this.dropzone.on('sending', function (file, xhr, data) {

            file.collection = this.collection;
            file.uploadId = uniqueIdentifier();

            data.append('collection_name', this.collection);
            data.append('model_name', this.model.name);
            data.append('model_id', this.model.id);

            this.vm.$store.dispatch('clearErrors', { collection: this.collection });
            this.vm.$store.dispatch(
                'startUpload',
                { id: file.uploadId, name: file.name, collection: this.collection }
            );

        }.bind(this));

        this.dropzone.on('uploadprogress', function (file) {
            this.vm.$store.dispatch(
                'updateUploadProgress',
                { id: file.uploadId, progress: file.upload.progress }
            );
        }.bind(this));

        this.dropzone.on('success', function (file, response) {
            this.vm.options.multiple ?
                this.vm.$store.dispatch('addMedia', { media: response }) :
                this.vm.$store.dispatch('replaceMedia', { collection: this.collection, media: response });
        }.bind(this));

        this.dropzone.on('error', function () {
            this.vm.$store.dispatch(
                'addError',
                { collection: this.collection, message: translate('errors.fail') }
            );
        }.bind(this));

        this.dropzone.on('complete', function (file) {
            this.vm.$store.dispatch('finishUpload', { id: file.uploadId });
        }.bind(this));
    },

    beforeDestroy() {
        this.dropzone.destroy();
    },

};
</script>

<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import Dropzone from 'dropzone';
import inject from '../../mixins/inject';
import translate from '../../translations';
import { uuid } from '../../util';

export default {

    props: [
        'collection',
        'model',
        'url',
        'multiple',
        'accepts',
    ],

    mixins: [
        inject('media', 'uploads'),
    ],

    mounted() {
        this.dropzone = new Dropzone(this.$el, {
            url: this.url,
            uploadMultiple: this.multiple,
            acceptedFiles: this.accepts,
            parallelUploads: 10,
            clickable: this.$parent.$refs.addMedia,

            previewsContainer: false,
            previewTemplate: false,

            dictInvalidFileType: translate('errors.acceptFileTypes'),
            dictFileTooBig: translate('errors.maxFileSize'),
            dictResponseError: translate('errors.fail'),
        });

        this.dropzone.on('sending', function (file, xhr, data) {
            file.collection = this.collection;
            file.uploadId = uuid();

            data.append('collection_name', this.collection);
            data.append('model_name', this.model.name);
            data.append('model_id', this.model.id);

            this.$uploads.clearError();
            this.$uploads.startUpload(file.uploadId, file.name);
        }.bind(this));

        this.dropzone.on('uploadprogress', function (file) {
            this.$uploads.updateUploadProgress(file.uploadId, file.upload.progress);
        }.bind(this));

        this.dropzone.on('success', function (file, response) {
            this.multiple ?
                this.$media.addMedia(response) :
                this.$media.replaceMedia(response);
        }.bind(this));

        this.dropzone.on('error', function () {
            this.$uploads.setError(translate('errors.fail'));
        }.bind(this));

        this.dropzone.on('complete', function (file) {
            this.$uploads.finishUpload(file.uploadId);
        }.bind(this));
    },

    beforeDestroy() {
        this.dropzone.destroy();
    },
};
</script>

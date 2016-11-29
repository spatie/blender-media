<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import Dropzone from 'dropzone';
import translate from '../../lib/trans';
import { uuid } from '../../lib/util';

export default {

    props: ['store'],

    mounted() {
        this.dropzone = new Dropzone(this.$el, {
            url: this.store.uploadUrl,
            uploadMultiple: this.store.settings.multiple,
            acceptedFiles: this.store.settings.accepts,
            parallelUploads: 10,
            clickable: this.$parent.$refs.addMedia,

            previewsContainer: false,
            previewTemplate: false,

            dictInvalidFileType: translate('errors.acceptFileTypes'),
            dictFileTooBig: translate('errors.maxFileSize'),
            dictResponseError: translate('errors.fail'),
        });

        this.dropzone.on('sending', function (file, xhr, data) {
            file.collection = this.store.collection;
            file.uploadId = uuid();

            data.append('collection_name', this.store.collection);
            data.append('model_name', this.store.model.name);
            data.append('model_id', this.store.model.id);

            this.store.clearError();
            this.store.startUpload(file.uploadId, file.name);
        }.bind(this));

        this.dropzone.on('uploadprogress', function (file) {
            this.store.updateUploadProgress(file.uploadId, file.upload.progress);
        }.bind(this));

        this.dropzone.on('success', function (file, response) {
            this.store.settings.multiple ?
                this.store.addMedia(response) :
                this.store.replaceMedia(response);
        }.bind(this));

        this.dropzone.on('error', function () {
            this.store.setError(translate('errors.fail'));
        }.bind(this));

        this.dropzone.on('complete', function (file) {
            this.store.finishUpload(file.uploadId);
        }.bind(this));
    },

    beforeDestroy() {
        this.dropzone.destroy();
    },
};
</script>

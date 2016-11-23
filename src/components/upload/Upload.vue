<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import Dropzone from 'dropzone';
import { inject } from 'vue-expose-inject';
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

    computed: {
        ...inject(['store']),
    },

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

            this.store.clearError();
            this.store.startUpload(file.uploadId, file.name);
        }.bind(this));

        this.dropzone.on('uploadprogress', function (file) {
            this.store.updateUploadProgress(file.uploadId, file.upload.progress);
        }.bind(this));

        this.dropzone.on('success', function (file, response) {
            this.multiple ?
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

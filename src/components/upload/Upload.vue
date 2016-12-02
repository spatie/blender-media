<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import Dropzone from 'dropzone';
import { query } from 'spatie-dom';
import translate from '../../lib/trans';
import { required, uuid } from '../../lib/util';

export default {

    props: required([
        'accepts',
        'collection',
        'model',
        'multiple',
        'uploadUrl',
    ]),

    mounted() {
        this.dropzone = new Dropzone(this.$el, {
            url: this.uploadUrl,
            uploadMultiple: this.multiple,
            acceptedFiles: this.accepts,
            parallelUploads: 10,
            clickable: query('.js-add-media', this.$el),

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

            this.$emit('started', { id: file.uploadId, name: file.name });
        }.bind(this));

        this.dropzone.on('uploadprogress', function (file) {
            this.$emit('progress', { id: file.uploadId, progress: file.upload.progress });
        }.bind(this));

        this.dropzone.on('success', function (file, response) {
            this.$emit('uploaded', { media: response });
        }.bind(this));

        this.dropzone.on('error', function () {
            this.$emit('error', { error: translate('errors.fail') });
        }.bind(this));

        this.dropzone.on('complete', function (file) {
            this.$emit('finished', { id: file.uploadId });
        }.bind(this));
    },

    beforeDestroy() {
        this.dropzone.destroy();
    },
};
</script>

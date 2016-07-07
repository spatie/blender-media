import Dropzone from 'dropzone';
import translate from '../../translations';
import { uniqueIdentifier } from '../../helpers';

export default {

    params: [
        'collection',
        'model',
        'url',
        'multiple',
        'accepts',
    ],

    bind() {

        const { collection, model } = this.params;

        this.vm.upload = new Dropzone(this.el, {
            url: this.params.url,
            uploadMultiple: this.params.multiple,
            acceptedFiles: this.params.accepts,
            parallelUploads: 10,
            clickable: this.el.querySelector('.js-add-media'),

            previewsContainer: false,
            previewTemplate: false,

            dictInvalidFileType: translate('errors.acceptFileTypes'),
            dictFileTooBig: translate('errors.maxFileSize'),
            dictResponseError: translate('errors.fail'),
        });

        // For some odd reason `bind` is necessary, arrow functions aren't working.

        this.vm.upload.on('sending', function (file, xhr, data) {

            file.collection = collection;
            file.uploadId = uniqueIdentifier();

            data.append('collection_name', collection);
            data.append('model_name', model.name);
            data.append('model_id', model.id);

            this.vm.$store.dispatch('clearErrors', { collection });
            this.vm.$store.dispatch(
                'startUpload',
                { id: file.uploadId, name: file.name, collection }
            );

        }.bind(this));

        this.vm.upload.on('uploadprogress', function (file) {
            this.vm.$store.dispatch(
                'updateUploadProgress',
                { id: file.uploadId, progress: file.upload.progress }
            );
        }.bind(this));

        this.vm.upload.on('success', function (file, response) {
            this.vm.options.multiple ?
                this.vm.$store.dispatch('addMedia', { media: response }) :
                this.vm.$store.dispatch('replaceMedia', { collection, media: response });
        }.bind(this));

        this.vm.upload.on('error', function () {
            this.vm.$store.dispatch(
                'addError',
                { collection, message: translate('errors.fail') }
            );
        }.bind(this));

        this.vm.upload.on('complete', function (file) {
            this.vm.$store.dispatch('finishUpload', { id: file.uploadId });
        }.bind(this));
    },

    unbind() {
        this.vm.upload.destroy();
    },

};

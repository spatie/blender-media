import {
    addError,
    addMedia,
    clearErrors,
    finishUpload,
    replaceMedia,
    startUpload,
    updateUploadProgress,
} from '../../actions';
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
        'clickable',
    ],

    bind() {

        const { collection, model } = this.params;

        this.vm.upload = new Dropzone(this.el, {
            url: this.params.url,
            uploadMultiple: this.params.multiple,
            acceptedFiles: this.params.accepts,
            parallelUploads: 10,
            clickable: this.params.clickable,

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

            clearErrors(this.vm.$store, collection);
            startUpload(this.vm.$store, file.uploadId, file.name, collection);
        }.bind(this));

        this.vm.upload.on('uploadprogress', function (file) {
            updateUploadProgress(this.vm.$store, file.uploadId, file.upload.progress);
        }.bind(this));

        this.vm.upload.on('success', function (file, response) {
            this.vm.options.multiple ?
                addMedia(this.vm.$store, response) :
                replaceMedia(this.vm.$store, collection, response);
        }.bind(this));

        this.vm.upload.on('error', function (file) {
            addError(this.vm.$store, collection, file.xhr.responseText);
        }.bind(this));

        this.vm.upload.on('complete', function (file) {
            finishUpload(this.vm.$store, file.uploadId);
        }.bind(this));
    },

    unbind() {
        this.vm.upload.destroy();
    },

};

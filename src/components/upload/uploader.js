import * as store from '../../store';
import Dropzone from 'dropzone';
import { getError } from '../../lib/helpers';

export default {

    data() {
        return {
            dropzoneOptions: {
                url: null,
                uploadMultiple: null,
                acceptedFiles: null,
                clickable: null,
                model: null,
            },
        };
    },

    methods: {
        initDropzone(element, options) {

            this.dropzoneOptions = options;

            new Dropzone(element, {
                url: this.dropzoneOptions.url,
                uploadMultiple: this.dropzoneOptions.uploadMultiple,
                acceptedFiles: this.dropzoneOptions.acceptedFiles,
                clickable: this.dropzoneOptions.clickable,
                previewsContainer: false,
                previewTemplate: false,
                sending: this.uploadSending,
                uploadprogress: this.uploadProgress,
                success: this.uploadSuccess,
                error: this.uploadFail,
                complete: this.uploadComplete,
            });
        },
        uploadSending(file, xhr, data) {
            file.collection = this.dropzoneOptions.collection;
            data.append('collection_name', this.dropzoneOptions.collection);
            data.append('model_name', this.dropzoneOptions.model.name);
            data.append('model_id', this.dropzoneOptions.model.id);
            store.clearErrors(this.dropzoneOptions.collection);
            store.startUpload(file);
        },
        uploadProgress(file) {
            store.updateProgress(file);
        },
        uploadSuccess(file, response) {
            store.addMedia(response);
        },
        uploadFail(file) {
            store.addError(this.dropzoneOptions.collection, getError(file.xhr));
        },
        uploadComplete(file) {
            store.finishUpload(file);
        },
    },

};

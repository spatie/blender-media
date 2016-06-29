import {
    addError,
    addMedia,
    clearErrors,
    finishUpload,
    startUpload,
    updateUploadProgress,
} from '../../actions';
import Dropzone from 'dropzone';
import { uniqueIdentifier } from '../../helpers';

export default {

    params: [
        'collection',
        'model',
        'url',
        'multiple',
        'acceptedFiles',
        'clickable',
    ],

    bind() {

        const { collection, model } = this.params;
        const store = this.vm.$store;

        this.vm.upload = new Dropzone(this.el, {
            url: this.params.url,
            uploadMultiple: this.params.multiple,
            acceptedFiles: this.params.accepts,
            parallelUploads: 10,

            previewsContainer: false,
            previewTemplate: false,

            sending(file, xhr, data) {

                file.collection = collection;
                file.uploadId = uniqueIdentifier();

                data.append('collection_name', collection);
                data.append('model_name', model.name);
                data.append('model_id', model.id);

                clearErrors(store, collection);
                startUpload(store, file.uploadId, file.name, collection);
            },
            uploadprogress(file) {
                updateUploadProgress(store, file.uploadId, file.upload.progress);
            },
            success(file, response) {
                addMedia(store, response);
            },
            error(file) {
                addError(store, collection, file.xhr.responseText);
            },
            complete(file) {
                finishUpload(store, file.uploadId);
            },
        });
    },

    unbind() {
        this.vm.upload.destroy();
    },

};

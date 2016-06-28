import Dropzone from 'dropzone';
import store from '../../store';
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

                store.dispatch('CLEAR_ERRORS', collection);
                store.dispatch('START_UPLOAD', file.uploadId, file.name, collection);
            },
            uploadprogress(file) {
                store.dispatch('UPDATE_UPLOAD_PROGRESS', file.uploadId, file.upload.progress);
            },
            success(file, response) {
                store.dispatch('ADD_MEDIA', response);
            },
            error(file) {
                store.dispatch('ADD_ERROR', collection, file.xhr.responseText);
            },
            complete(file) {
                store.dispatch('FINISH_UPLOAD', file.uploadId);
            },
        });
    },

    unbind() {
        this.vm.upload.destroy();
    },

};

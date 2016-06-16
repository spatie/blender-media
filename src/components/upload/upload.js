import * as store from '../../store';
import Dropzone from 'dropzone';
import { getError } from '../../lib/helpers';

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

            previewsContainer: false,
            previewTemplate: false,

            sending(file, xhr, data) {
                file.collection = collection;
                data.append('collection_name', collection);
                data.append('model_name', model.name);
                data.append('model_id', model.id);
                store.clearErrors(collection);
                store.startUpload(file);
            },
            uploadprogress(file) {
                store.updateProgress(file);
            },
            success(file, response) {
                store.addMedia(response);
            },
            error(file) {
                store.addError(collection, getError(file.xhr));
            },
            complete(file) {
                store.finishUpload(file);
            },
        });
    },

    unbind() {
        this.vm.upload.destroy();
    },

};

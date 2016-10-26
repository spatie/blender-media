export default {

    data() {
        return {
            error: '',
            uploads: [],
        };
    },

    methods: {
        startUpload(id, name) {
            this.uploads.push({ id, name, progress: 0 });
        },

        updateUploadProgress(id, progress) {
            const upload = this.uploads.filter(upload => upload.id === id)[0];

            if (! upload) {
                return;
            }

            upload.progress = progress;
        },

        finishUpload(id) {
            this.uploads = this.uploads.filter(upload => upload.id !== id);
        },

        setError(message) {
            this.error = message;
        },

        clearError() {
            this.error = '';
        },
    },
};

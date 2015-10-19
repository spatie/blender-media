import UploadActions from '../Actions/UploadActions'
import MediaActions from '../Actions/MediaActions'
import { mapToArray } from '../Utilities'

class UploadStore {
    constructor() {
        this.progress = new Map
        this.error = null
        this.uploadCount = 0

        this.bindActions(this.alt.getActions('upload'))
    }

    static getProgress() {
        let progress = this.getState().progress ? mapToArray(this.getState().progress) : null

        if (progress.length === 0) {
            return null
        }

        return progress.reduce((carry, progress) => carry + progress, 0) / progress.length
    }

    start() {
        this.error = null
    }

    getUploadId(file) {
        if (file.uploadId) {
            return file.uploadId
        }

        this.uploadCount++
        file.uploadId = this.uploadCount
    }

    setProgress([ file, progress ]) {
        let uploadId = this.getUploadId(file)

        this.progress.set(file.uploadId, progress)
    }

    setError([ file, error, response ]) {
        this.progress = null
        this.error = response.status === 500 ? translate('parts.upload.fail') : error
    }

    complete() {
        this.progress = new Map
    }

    dismissError() {
        this.error = null
    }
}

export default UploadStore

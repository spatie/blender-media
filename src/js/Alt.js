import Base from 'alt'
import MediaActions from './Actions/MediaActions'
import MediaStore from './Stores/MediaStore'
import UploadStore from './Stores/UploadStore'
import UploadActions from './Actions/UploadActions'

class Alt extends Base {
    constructor(config = {}) {
        super(config)

        this.addActions('media', MediaActions)
        this.addActions('upload', UploadActions)

        this.addStore('media', MediaStore)
        this.addStore('upload', UploadStore)
    }
}

export default Alt

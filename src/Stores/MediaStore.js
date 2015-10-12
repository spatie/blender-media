import assign from 'object-assign'
import _ from 'lodash'

class MediaStore {
    constructor() {
        this.items = new Map()
        this.data = {}

        this.bindActions(this.alt.getActions('media'))
    }

    _find(id) {
        let media = this.items.get(id)

        if (! media) {
            throw new Error(`Media ${id} not found`)
        }

        return media
    }

    initialize([ media, data ]) {
        media.forEach(item => this.items.set(item.id, item))
        this.data = data
    }

    addUploadedMedia(media) {
        this.items.set(media.id, media)
    }

    removeMedia(id) {
        this.items.delete(id)
    }

    rename([ id, name ]) {
        this._find(id).name = name
    }

    updateCustomProperties([ id, values ]) {
        let media = this._find(id)

        media.custom_properties = assign({}, media.custom_properties, values)
    }

    setNewOrder(ids) {
        ids = ids.map(id => parseInt(id))

        this.items.forEach(item => {
            item.order_column = ids.indexOf(item.id)+1
        })
    }
}

export default MediaStore

import _ from 'lodash'
import Alt from './Alt'
import Map from 'es6-map'
import Media from './Components/Media'
import React from 'react'
import ReactDOM from 'react-dom'

class MountsMediaComponents {

    constructor() {
        this.components = new Map()
    }

    register(name, props = {}) {
        this.components.set(name, props)
    }

    mount() {
        let mediaCollections = document.querySelectorAll('[data-media-collection]')

        Array.prototype.forEach.call(
            mediaCollections,
            node => this.mountCollection(node)
        )
    }

    mountCollection(node) {
        let collection = node.dataset.mediaCollection
        let model = JSON.parse(node.dataset.model)
        let debug = !!node.dataset.debug

        let componentProps = this.components.get(node.dataset.mediaType)
        if (! componentProps) {
            throw new Error(`Component type ${node.dataset.mediaType} not registered`)
        }

        let alt = new Alt

        alt.getActions('media').initialize(
            JSON.parse(node.dataset.initial),
            this.getAssociatedData(node)
        )

        ReactDOM.render(
            <Media collection={collection}
                   model={model}
                   debug={!!debug}
                   alt={alt}
                   {...componentProps} />,
            node
        )
    }

    getAssociatedData(node) {
        const reservedNodeProperties = [
            'mediaCollection',
            'mediaType',
            'initial',
            'model',
            'debug'
        ]

        let keys = _.difference(Object.keys(node.dataset), reservedNodeProperties)

        return keys.reduce((carry, key) => {
            carry[key] = JSON.parse(node.dataset[key])
            return carry
        }, {})
    }
}

export default new MountsMediaComponents

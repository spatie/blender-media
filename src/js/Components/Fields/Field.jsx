import assign from 'object-assign'
import React from 'react'

const Field = {
    contextTypes: {
        media: React.PropTypes.object.isRequired,
        data: React.PropTypes.object,
        alt: React.PropTypes.object.isRequired
    },

    propTypes: {
        style: React.PropTypes.object,
        className: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            style: {},
            className: ''
        }
    }
}

export default Field

import React from 'react'
import Text from './Text'
import Alt from '../Alt'

const Name = React.createClass({
    mixins: [Alt],

    propTypes: {
        withLabel: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            withLabel: false
        }
    },
    
    contextTypes: {
        media: React.PropTypes.object
    },

    handleRename(event) {
        this.context.alt.getActions('media').rename(this.context.media.id, event)
    },

    render() {
        return <Text label={this.props.withLabel ? 'Naam' : null}
                     value={this.context.media.name}
                     handleInput={this.handleRename} />
    }
})

export default Name

import React from 'react'
import Field from './Field'

const Text = React.createClass({
    mixins: [Field],

    propTypes: {
        value: React.PropTypes.string,
        handleInput: React.PropTypes.func.isRequired
    },

    handleFocus() {
        // Autofocus magic
        window.setTimeout(() => { document.execCommand('selectAll', false, null) }, 0)
    },

    render() {
        return (
            <div className="text"
                 style={this.props.style}
                 dangerouslySetInnerHTML={{ __html: this.props.value }}
                 onFocus={this.handleFocus}
                 onKeyUp={this.props.handleInput}
                 onBlur={this.props.handleInput}
                 contentEditable="true">
            </div>
        )
    }
})

export default Text

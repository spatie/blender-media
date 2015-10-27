import Alt from '../Alt'
import React from 'react'
import ReactDOM from 'react-dom'
import Field from './Field'

const Text = React.createClass({
    mixins: [Alt, Field],

    propTypes: {
        label: React.PropTypes.string,
        value: React.PropTypes.string,
        for: React.PropTypes.string,
        handleInput: React.PropTypes.func
    },

    focusInput() {
        window.setTimeout(() => {
            let input = ReactDOM.findDOMNode(this.refs.input)
            input.focus()
            document.execCommand('selectAll', false, null)
        }, 0)
    },

    shouldComponentUpdate(nextProps) {
        // The DOM isn't allowed to rerender to prevent caret jumps in Firefox
        // https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
        return nextProps.value !== ReactDOM.findDOMNode(this.refs.input).innerHTML;
    },

    handleInput(event) {
        this.context.alt.getActions('media').updateCustomProperties(
            this.context.media.id,
            { [this.props.for]: event.target.innerHTML }
        )
    },

    render() {
        let value = this.props.for ?
            this.context.media.custom_properties[this.props.for] : 
            this.props.value

        let handleInput = this.props.handleInput || this.handleInput

        return (
            <div className="text" style={this.props.style}>
                <div className="text_input"
                     dangerouslySetInnerHTML={{ __html: value }}
                     onFocus={this.handleFocus}
                     onKeyUp={handleInput}
                     onBlur={handleInput}
                     contentEditable="true"
                     ref="input">
                </div>
                <div className="text_label" onClick={this.focusInput}>
                    <i className="fa fa-pencil" /> {this.props.label}
                </div>
            </div>
        )
    }
})

export default Text

import Alt from '../Alt'
import React from 'react'
import ReactDOM from 'react-dom'
import Field from './Field'

const Text = React.createClass({
    mixins: [Alt, Field],

    propTypes: {
        label: React.PropTypes.string,
        value: React.PropTypes.string,
        forProperty: React.PropTypes.string,
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
        return nextProps.value !== ReactDOM.findDOMNode(this.refs.input).innerHTML;
    },

    render() {
        let value = this.props.forProperty ?
            this.context.media.custom_properties[this.props.forProperty] : 
            this.props.value

        let handleInput = this.props.handleInput ?
            this.props.handleInput :
            (event) => {
                this.context.alt.getActions('media').updateCustomProperties(
                    this.context.media.id,
                    { [this.props.forProperty]: event.target.innerHTML }
                )
            }

        return (
            <div className="text" style={this.props.style}>
                <div className={`text_input ${value ? null : '-empty'}`}
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

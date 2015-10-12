import React from 'react'
import Field from './Field'

const Toggle = React.createClass({
    mixins: [Field],

    propTypes: {
        for: React.PropTypes.string.isRequired,
        default: React.PropTypes.bool,
        contents: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            default: false
        }
    },

    isActive() {
        return this.context.media.custom_properties[this.props.for] || this.props.default
    },

    updateProperty(value) {
        return () => {
            this.context.alt.getActions('media').updateCustomProperties(
                this.context.media.id, 
                { [this.props.for]: value }
            )
        }
    },

    render() {
        let active = this.isActive()
        let onClick = this.updateProperty(!active)

        return (
            <div style={this.props.style} className="toggle">
                <span onClick={onClick}>
                    <this.props.contents active={active} />
                </span>
            </div>
        )
    }
})

export default Toggle

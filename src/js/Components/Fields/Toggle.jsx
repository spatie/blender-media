import React from 'react'
import Field from './Field'

const Toggle = React.createClass({
    mixins: [Field],

    propTypes: {
        for: React.PropTypes.string.isRequired,
        default: React.PropTypes.bool,
        icon: React.PropTypes.shape({
            on: React.PropTypes.string,
            off: React.PropTypes.string
        }),
        label: React.PropTypes.shape({
            on: React.PropTypes.string,
            off: React.PropTypes.string
        })
    },
    getDefaultProps() {
        return {
            default: false
        }
    },

    isActive() {
        let active = this.context.media.custom_properties[this.props.for]
        return active !== undefined ? active : this.props.default
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

        let icon = this.props.icon ?
            <span className="toggle_icon">
                <i className={`fa fa-${active ? this.props.icon.on : this.props.icon.off}`} />
            </span> :
            null

        let label = this.props.label ?
            <span className="toggle_label">{active ? this.props.label.on : this.props.label.off}</span> :
            null

        return (
            <div className={`toggle ${this.isActive() ? '-active' : ''}`} onClick={onClick}>
                {icon}
                {label}
            </div>
        )
    }
})

export default Toggle

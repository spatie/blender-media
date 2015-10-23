import React from 'react'
import Field from './Field'

const Toggle = React.createClass({
    mixins: [Field],

    propTypes: {
        for: React.PropTypes.string.isRequired,
        default: React.PropTypes.bool,
        icons: React.PropTypes.shape({
            on: React.PropTypes.string,
            off: React.PropTypes.string
        }),
        label: React.PropTypes.string
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

        let icon = this.props.icons ?
            <span className="toggle_icon">
                <i className={`fa fa-${active ? this.props.icons.on : this.props.icons.off}`} />
            </span> :
            null

        let label = this.props.label ?
            <span className="toggle_label">this.props.label</span> :
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

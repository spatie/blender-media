import Alt from '../Alt'
import BaseSelect from 'react-select'
import Field from './Field'
import React from 'react'
import { translate } from '../../Utilities'

const Select = React.createClass({
    mixins: [Alt, Field],

    propTypes: {
        default: React.PropTypes.node,
        for: React.PropTypes.string,
        handleInput: React.PropTypes.func,
        options: React.PropTypes.arrayOf(React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.node
        })).isRequired
    },

    handleInput(newValue) {
        this.context.alt.getActions('media').updateCustomProperties(
            this.context.media.id,
            { [this.props.for]: newValue }
        )
    },

    render() {
        let value = this.context.media.custom_properties[this.props.for] || this.props.default

        let handleInput = this.props.handleInput || this.handleInput

        return (
            <BaseSelect className="select"
                        clearable={false}
                        value={value}
                        placeholder={translate('select.select')}
                        noResultsText={translate('select.noResults')}
                        options={this.props.options}
                        onChange={handleInput} />
        )
    }
})


export default Select

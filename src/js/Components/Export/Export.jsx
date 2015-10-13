import React from 'react'

const Export = React.createClass({
    contextTypes: {
        debug: React.PropTypes.bool
    },

    render() {
        let data = this.context.debug ?
            JSON.stringify(this.props.data, null, '\t') :
            JSON.stringify(this.props.data)

        return <textarea readOnly
                         name={this.props.name}
                         value={data}
                         className={this.context.debug ? 'export -debug' : 'export'} />
    }
})

export default Export

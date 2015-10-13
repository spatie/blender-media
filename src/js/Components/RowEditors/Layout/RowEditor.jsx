import React from 'react'

const RowEditor = React.createClass({
    render() {
        return <td className="row_editor">{this.props.children}</td>
    }
})

export default RowEditor

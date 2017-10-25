import Alt from '../Alt'
import React from 'react'
import __ from '../../lang'

const UploadButton = React.createClass({
    mixins: [Alt],

    contextTypes: {
        collection: React.PropTypes.string
    },

    render() {
        let style = {
            display: this.props.display ? 'block' : 'none'
        }

        let errors = this.props.error ?
            <div className="alert -danger"
                 onClick={this.context.alt.getActions('upload').dismissError}>
                {this.props.error}
            </div> :
            null

        return (
            <div style={style}>
                <div className="upload_add">
                    <a className="button -blue fileinput-button"
                       data-media-upload={this.context.collection}>{__('addFiles')}</a>
                    {errors}
                </div>
            </div>
        )
    }
})

export default UploadButton

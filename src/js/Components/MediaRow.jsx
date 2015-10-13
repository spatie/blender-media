import React from 'react'
import ReactDOM from 'react-dom'
import { confirm, isImage, getIconForFile } from '../Utilities'
import Alt from './Alt'

const MediaRow = React.createClass({
    mixins: [Alt],

    propTypes: {
        media: React.PropTypes.object.isRequired,
        rowEditor: React.PropTypes.element,
    },
    getDefaultProps() {
        return {
            media: null,
            rowEditor: null
        }
    },

    childContextTypes: {
         media: React.PropTypes.object
    },
    getChildContext() {
        return { media: this.props.media }
    },

    handleRemove(event) {
        if (event.shiftKey) {
            return this.context.alt.getActions('media').removeMedia(this.props.media.id)
        }

        confirm(() => this.context.alt.getActions('media').removeMedia(this.props.media.id))
    },

    isImage() {
        return isImage(this.props.media.file_name)
    },

    thumbnail() {
        if (this.isImage()) {
            return `/media/${this.props.media.id}/conversions/admin.jpg`
        }

        return null
    },

    render() {
        let thumb = this.isImage() ?
            <img className="image" src={this.thumbnail()} /> :
            <span className="icon"><i className={`fa ${getIconForFile(this.props.media.file_name)}`} /></span>

        return (
            <tr className="row" data-id={this.props.media.id}>
                <td className="row_order" data-sortablehandle>
                    <i className="fa fa-arrows-v"></i>
                </td>
                <td className="row_thumb">
                    <a href={`/media/${this.props.media.id}/${this.props.media.file_name}`}
                       target="_blank"
                       tabIndex="-1">
                        {thumb}
                    </a>
                </td>
                {this.props.rowEditor}
                <td className="row_actions">
                    <a className="button -small -danger" onClick={this.handleRemove}>
                        <i className="fa fa-remove"></i>
                    </a>
                </td>
            </tr>
        )
    }
})

export default MediaRow
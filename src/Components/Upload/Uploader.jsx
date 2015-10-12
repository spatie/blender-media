import Alt from '../Alt'
import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'dropzone'
import UploadButton from './UploadButton'
import ProgressBar from './ProgressBar'
import { translate } from '../../Utilities'

const Uploader = React.createClass({
    mixins: [Alt],

    contextTypes: {
        collection: React.PropTypes.string
    },

    componentDidMount() {
        this.initializeDropzone()
    },

    propTypes: {
        acceptedFiles: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            acceptedFiles: null
        }
    },

    initializeDropzone() {
        let uploadButton = document.querySelector(`[data-media-upload="${this.context.collection}"]`)

        let acceptedFiles = this.props.acceptedFiles
        if (acceptedFiles === 'images') {
            acceptedFiles = '.png,.jpg,.jpeg'
        }

        let handleSuccess = (file, response) => {
            this.context.alt.getActions('media').addUploadedMedia(response.media)
        }

        this.dropzone = new Dropzone(ReactDOM.findDOMNode(this), {
            url: this.props.url,
            uploadMultiple: false,
            clickable: uploadButton,
            acceptedFiles: acceptedFiles,
            createImageThumbnails: false,
            previewTemplate: '<div style="display:none"></div>', // :(

            sending: (file, xhr, data) => {
                data.append('collection_name', this.context.collection)
                data.append('model_name', this.props.model.name)
                data.append('model_id', this.props.model.id)
            },

            addedfile: this.context.alt.getActions('upload').start,
            uploadprogress: this.context.alt.getActions('upload').setProgress,
            success: handleSuccess,
            error: this.context.alt.getActions('upload').setError,
            queuecomplete: this.context.alt.getActions('upload').complete,

            dictInvalidFileType: translate('parts.upload.acceptFileTypes'),
            dictFileTooBig: translate('parts.upload.maxFileSize'),
            dictResponseError: translate('parts.upload.fail'),
            dictMaxFilesExceeded: translate('parts.upload.maxNumberOfFiles')
        })

        uploadButton.addEventListener('click', (e) => e.preventDefault())
    },

    render() {
        return (
            <div className="upload_dropzone">
                {this.props.children}
                <section className="upload">
                    <UploadButton display={this.context.alt.getStore('upload').getProgress() === null}
                                  error={this.props.status.error} />
                    <ProgressBar progress={this.props.status.progress} />
                </section>
            </div>
        )
    },
})

export default Uploader

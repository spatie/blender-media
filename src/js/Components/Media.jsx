import DefaultRowEditor from './RowEditors/DefaultRowEditor'
import Export from './Export/Export'
import MediaRow from './MediaRow'
import React from 'react'
import ReactDOM from 'react-dom'
import Uploader from './Upload/Uploader'
import { mapToArray, translate } from '../Utilities'

const Media = React.createClass({
    getInitialState() {
        return {
            media: {
                items: mapToArray(this.props.alt.getStore('media').getState().items),
                data: this.props.alt.getStore('media').getState().data
            },
            upload: this.props.alt.getStore('upload').getState()
        }
    },

    propTypes: {
        collection: React.PropTypes.string.isRequired,
        debug: React.PropTypes.bool,
        rowEditor: React.PropTypes.element,
        uploadUrl: React.PropTypes.string,
        model: React.PropTypes.shape({
            name: React.PropTypes.string,
            id: React.PropTypes.number
        }).isRequired,
        alt: React.PropTypes.object.isRequired
    },
    getDefaultProps() {
        return {
            collection: '',
            uploadUrl: '/blender/api/media',
            debug: false,
            rowEditor: <DefaultRowEditor />
        }
    },

    childContextTypes: {
         debug: React.PropTypes.bool,
         collection: React.PropTypes.string.isRequired,
         data: React.PropTypes.object,
         alt: React.PropTypes.object.isRequired
    },
    getChildContext() {
        return {
            debug: this.props.debug,
            collection: this.props.collection,
            data: this.state.media.data,
            alt: this.props.alt
        }
    },

    componentDidMount() {
        this.props.alt.getStore('media').listen(this.onMediaChange)
        this.props.alt.getStore('upload').listen(this.onUploadChange)

        this.initializeSortable()
        this.warnDraftable()
    },
    componentDidUpdate() {
        this.destroySortable()
        this.initializeSortable()
    },
    componentWillUnmount() {
        this.props.alt.getStore('media').unlisten(this.onMediaChange)
        this.props.alt.getStore('upload').unlisten(this.onUploadChange)
    },

    onMediaChange(state) {
        this.setState({
            media: {
                items: mapToArray(state.items),
                data: state.data
            }
        })
    },
    onUploadChange(state) {
        this.setState({ upload: state })
    },

    initializeSortable() {
        this.$sortable = $(ReactDOM.findDOMNode(this.refs.sortable))
        this.$sortableContainer = $(ReactDOM.findDOMNode(this.refs.sortableContainer))

        this.$sortable.sortable({
            containment: this.$sortableContainer,
            handle: $('[data-sortablehandle]'),
            start: (e, ui) => {
                let $item = $(ui.item)

                $item.css({
                    'width': this.$sortable.width(),
                    'z-index': 999
                })

                $(ui.placeholder).height($item.height())
            },
            stop: (e, ui) => {
                let $item = $(ui.item)

                $item.css({
                    width: '',
                    'z-index': ''
                })

                let order = this.$sortable.sortable('toArray', { attribute: 'data-id' })
                this.$sortable.sortable('cancel')
                this.props.alt.getActions('media').setNewOrder(order)
            },
            helper: (e, ui) => {
                // Preserve width on drag
                ui.children().each(function() {
                    $(this).width($(this).width())
                })
                return ui;
            }
        })

        this.updateSortableContainer()
    },
    destroySortable() {
        this.$sortable.sortable('destroy')
    },
    updateSortableContainer() {
        this.$sortableContainer.css({
            height: this.$sortable.height() + 25,
            width: '100%',
            position: 'absolute',
            top: '-10px'
        })
    },

    warnDraftable() {
        let hasTemp = this.state.media.items.filter(media => {
            return media.custom_properties ? media.custom_properties.temp : false
        }).length

        if (! hasTemp) {
            return
        }

        $(ReactDOM.findDOMNode(this)).closest('form[data-autosave]')[0].addDraftWarning()
    },

    render() {
        let mediaRows = this.state.media.items
            .sort((a, b) => a.order_column - b.order_column)
            .map(media => {
                return <MediaRow key={media.id}
                                 media={media}
                                 rowEditor={this.props.rowEditor} />
            })

        if (mediaRows.length === 0) {
            mediaRows = <tr className="row"><td>{translate('dataTables.infoEmpty')}</td></tr>
        }

        return (
            <div className="media">
                <Uploader url={this.props.uploadUrl}
                          model={this.props.model}
                          status={this.state.upload}
                          acceptedFiles={this.props.acceptedFiles}>
                    <div ref="sortableContainer" />
                    <table>
                        <tbody ref="sortable">
                            {mediaRows}
                        </tbody>
                    </table>
                </Uploader>
                <Export name={this.props.collection} data={this.state.media.items} />
            </div>
        )
    }
})

export default Media

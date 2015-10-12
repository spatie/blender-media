const MediaActions = function() {
    this.generateActions(
        'initialize',
        'addData',
        'addUploadedMedia',
        'updateCustomProperties',
        'removeMedia',
        'setNewOrder'
    )

    this.rename = (id, event) => [ id, event.target.innerText ]
}

export default MediaActions

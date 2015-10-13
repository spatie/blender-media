const UploadActions = function() {
    this.generateActions(
        'start',
        'complete',
        'setProgress',
        'setError',
        'dismissError'
    )
}

export default UploadActions

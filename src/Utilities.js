import translate from 'blender.js/modules/interface.translations'

function mapToArray(map) {
    return Array.from(map.values())
}

function confirm(action) {
    $.confirm({
        title: translate('confirm.text'),
        content: ' ',
        confirmButton: translate('confirm.yes'),
        cancelButton: translate('confirm.no'),
        confirmButtonClass: 'button',
        cancelButtonClass: 'button -gray',
        confirm: action
    })
}

function readableFileSize(size) {
    let units = ['B', 'KB', 'MB', 'GB', 'TB']

    if (size === 0) {
        return '0 '+units[1]
    }

    let i = 0
    for (i; size > 1024; i++) {
        size /= 1024
    }

    return Math.round(size, 2)+' '+units[i]
}

function getExtensionFromFilename(filename) {
    return filename.split('.').pop().toLowerCase()
}

function isImage(filename) {
    const imageExtensions = ['jpg', 'jpeg', 'gif', 'png']
    
    let extension = getExtensionFromFilename(filename)

    return imageExtensions
        .filter(imageExtension => extension === imageExtension)
        .length
}

function getIconForFile(filename) {
    let extension = getExtensionFromFilename(filename)

    switch(extension) {
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'png':
            return 'fa-file-image-o'
        case 'pdf':
            return 'fa-file-pdf-o'
        case 'doc':
        case 'docx':
            return 'fa-file-word-o'
        case 'ppt':
        case 'pptx':
            return 'fa-file-powerpoint-o'
        case 'xls':
        case 'xlsx':
            return 'fa-file-excel-o'
        case 'mp3':
        case 'aac':
            return 'fa-file-audio-o'
        case 'mp4':
        case 'flv':
        case 'avi':
        case 'mkv':
            return 'fa-file-audio-o'
        case 'zip':
        case 'tar':
            return 'fa-file-zip-o'
        case 'html':
        case 'css':
        case 'js':
            return 'fa-file-code-o'
        default:
            return 'fa-file-o'
    }
}

export default {
    translate: translate,
    mapToArray: mapToArray,
    confirm: confirm,
    readableFileSize: readableFileSize,
    getExtensionFromFilename: getExtensionFromFilename,
    isImage: isImage,
    getIconForFile: getIconForFile
}

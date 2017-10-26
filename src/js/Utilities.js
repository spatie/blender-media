import translate from 'blender.js/modules/interface.translations'
import getClassNameForExtension from 'font-awesome-filetypes'

function mapToArray(map) {
    return [...map.values()]
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

    return getClassNameForExtension(extension)
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

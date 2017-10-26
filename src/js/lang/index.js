// Media component specific translations are stored here.
// Other translations are managed by spatie/blender.js@^1.0.

const translations = {
    nl: {
        addFiles: 'Voeg bestanden toe'
    },
    en: {
        addFiles: 'Add files'
    }
}

export default function __(key) {
    const lang = document.documentElement.getAttribute('lang')

    return translations[lang][key]
}
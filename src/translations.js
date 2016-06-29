import _ from 'lodash';

const translations = {
    nl: {
        'noMedia': 'Geen items',
        'addMedia': 'Toevoegen',
        'errors.maxNumberOfFiles': 'Maximum aantal bestanden overschreden',
        'errors.acceptFileTypes': 'Bestandstype niet toegestaan',
        'errors.maxFileSize': 'Bestand is te groot',
        'errors.minFileSize': 'Bestand is te klein',
        'errors.fail': 'Er liep iets mis bij de verwerking',
    },
    en: {
        'noMedia': 'No items',
        'addMedia': 'Add',
        'errors.maxNumberOfFiles': 'Maximum number of files exceeded',
        'errors.acceptFileTypes': 'File type not allowed',
        'errors.maxFileSize': 'File size too big',
        'errors.minFileSize': 'File size too small',
        'errors.fail': 'Something went wrong during the conversion',
    },
    fr: {
        'noMedia': 'Pas d\'objets',
        'addMedia': 'Ajouter',
        'errors.maxNumberOfFiles': 'Maximum aantal bestanden overschreden',
        'errors.acceptFileTypes': 'Nombre maximum de fichiers dépassé',
        'errors.maxFileSize': 'Fichier est trop volumineux',
        'errors.minFileSize': 'Fichier est trop petit',
        'errors.fail': 'Quelque chose a mal tourné dans le traitement',
    },
};

export const translate = (key, parameters = {}) => {

    const translation = translations[language][key];

    if (!translation) {
        return key;
    }

    return translation.replace(/:[\w]+/g, (key => parameters[key.slice(1)] || key));
};

const language = (() => {
    const language = document.querySelector('html').getAttribute('lang');

    if (!_(translations).keys().includes(language)) {
        return 'en';
    }

    return language;
})();

export default translate;

import { includes, keys } from 'lodash';

const translations = {
    nl: {
        'noMedia': 'Geen items',
        'addMedia': 'Toevoegen',
        'replaceMedia': 'Vervangen',
        'clearCollection': 'Alles verwijderen',
        'errors.maxNumberOfFiles': 'Maximum aantal bestanden overschreden',
        'errors.acceptFileTypes': 'Bestandstype niet toegestaan',
        'errors.maxFileSize': 'Bestand is te groot',
        'errors.fail': 'Er liep iets mis bij de verwerking',
    },
    en: {
        'noMedia': 'No items',
        'addMedia': 'Add',
        'replaceMedia': 'Replace',
        'clearCollection': 'Remove all',
        'errors.maxNumberOfFiles': 'Maximum number of files exceeded',
        'errors.acceptFileTypes': 'File type not allowed',
        'errors.maxFileSize': 'File size too big',
        'errors.fail': 'Something went wrong during the conversion',
    },
    fr: {
        'noMedia': 'Pas d\'objets',
        'addMedia': 'Ajouter',
        'replaceMedia': 'Remplacer',
        'clearCollection': 'Supprimer tous',
        'errors.maxNumberOfFiles': 'Maximum aantal bestanden overschreden',
        'errors.acceptFileTypes': 'Nombre maximum de fichiers dépassé',
        'errors.maxFileSize': 'Fichier est trop volumineux',
        'errors.fail': 'Quelque chose a mal tourné dans le traitement',
    },
};

const language = (() => {
    const language = document.querySelector('html').getAttribute('lang');
    const languages = keys(translations);

    return includes(languages, language) ? language : 'en';
})();

export const trans = (key, parameters = {}) => {
    const translation = translations[language][key];

    if (! translation) {
        return key;
    }

    return translation.replace(/:[\w]+/g, key => parameters[key.slice(1)] || key);
};

export default trans;

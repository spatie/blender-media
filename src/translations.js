import _ from 'lodash';

const translations = {
    nl: {
        'yes': 'Ja',
        'no': 'Nee',
        'areYouSure': 'Bent u zeker?',
        'noMedia': 'Geen items',
        'addMedia': 'Toevoegen',
        'error.maxNumberOfFiles': 'Maximum aantal bestanden overschreden',
        'error.acceptFileTypes': 'Bestandstype niet toegestaan',
        'error.maxFileSize': 'Bestand is te groot',
        'error.minFileSize': 'Bestand is te klein',
        'error.fail': 'Er liep iets mis bij de verwerking',
    },
    en: {
        'yes': 'Yes',
        'no': 'No',
        'areYouSure': 'Are you sure?',
        'noMedia': 'No items',
        'addMedia': 'Add',
        'error.maxNumberOfFiles': 'Maximum number of files exceeded',
        'error.acceptFileTypes': 'File type not allowed',
        'error.maxFileSize': 'File size too big',
        'error.minFileSize': 'File size too small',
        'error.fail': 'Something went wrong during the conversion',
    },
    fr: {
        'yes': 'Oui',
        'no': 'Non',
        'areYouSure': 'Etes-vous sûr?',
        'noMedia': 'Pas d\'objets',
        'addMedia': 'Ajouter',
        'error.maxNumberOfFiles': 'Maximum aantal bestanden overschreden',
        'error.acceptFileTypes': 'Nombre maximum de fichiers dépassé',
        'error.maxFileSize': 'Fichier est trop volumineux',
        'error.minFileSize': 'Fichier est trop petit',
        'error.fail': 'Quelque chose a mal tourné dans le traitement',
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

const mixin = {
    methods: {
        translate,
    },
};

export default mixin;

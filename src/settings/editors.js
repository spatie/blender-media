import Basic from '../components/editors/Basic';
import SizePicker from '../components/editors/SizePicker';
import ToggleLocales from '../components/editors/ToggleLocales';
import TranslatedDescription from '../components/editors/TranslatedDescription';

const editors = {};

export function registerEditor(name, editor) {
    editors[name] = editor;
}

export function getEditor(name) {
    if (! editors.hasOwnProperty(name)) {
        throw new Error(`Editor \`${name}\` doesn't exist`);
    }
    
    return editors[name];
}

registerEditor('basic', Basic);
registerEditor('sizePicker', SizePicker);
registerEditor('toggleLocales', ToggleLocales);
registerEditor('translatedDescrition', TranslatedDescription);

import Basic from '../components/editors/Basic';
import Description from '../components/editors/Description';
import Locales from '../components/editors/Locales';

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
registerEditor('locales', Locales);
registerEditor('description', Description);

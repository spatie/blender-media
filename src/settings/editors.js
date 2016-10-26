import BasicEditor from '../components/editors/basic';
import LocaleEditor from '../components/editors/locales';

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

registerEditor('basic', BasicEditor);
registerEditor('locales', LocaleEditor);

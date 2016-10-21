import BasicEditor from '../components/editors/basic';
import LocaleEditor from '../components/editors/locales';

const editors = {};

export const registerEditor = (name, editor) => editors[name] = editor;

export const getEditors = () => editors;

registerEditor('basic', BasicEditor);

registerEditor('locales', LocaleEditor);

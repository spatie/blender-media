import { extendType, registerType } from './settings/types';
import editor from './components/editors/editor';
import Media from './components/Media';
import { registerEditor } from './settings/editors';

export default Media;

export {
    Media,
    editor,
    registerEditor,
    extendType,
    registerType,
};

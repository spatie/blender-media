import { assign } from 'lodash';
import BasicEditor from './components/editors/basic';

export const editors = {};

export const registerEditor = (name, component) => {
    editors[name] = assign({}, component, { props: ['media'] });
};

registerEditor('basic', BasicEditor);

export default editors;

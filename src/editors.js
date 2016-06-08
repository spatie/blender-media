import BasicEditor from './components/editors/basic';

export const editors = {};

export const registerEditor = (name, component) => {
    editors[name] = {
        ...component,
        props: ['media'],
    };
};

registerEditor('basic', BasicEditor);

export default editors;

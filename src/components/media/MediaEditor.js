import { getEditor } from '../../settings/editors';

export default {

    functional: true,

    props: ['type', 'media', 'data'],

    render(createElement, { props }) {
        return createElement(getEditor(props.type), {
            props: {
                media: props.media,
                data: props.data,
            },
        });
    },
};

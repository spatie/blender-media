import { getEditor } from '../../settings/editors';

export default {

    functional: true,

    props: ['type', 'media', 'data'],

    render(createElement, { props: { type, media, data } }) {
        return createElement(getEditor(type), {
            props: {
                media: media,
                data: data,
            },
        });
    },
};

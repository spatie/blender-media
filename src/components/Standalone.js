import configuration from './configuration';
import Media from './Media';
import { pipe } from '../lib/util';
import { mapValues, reject, sortBy } from 'lodash';

export default {

    props: {
        ...configuration,
        initial: {
            required: true,
            type: Array,
        },
    },

    components: {
        Media,
    },

    data() {
        return {
            value: this.initial,
        };
    },

    render(h) {
        return h('div', {}, [
            h(Media, {
                props: {
                    ...mapValues(this.props, (_, prop) => this[prop]),
                    value: this.value,
                },
                on: {
                    input: value => this.value = value,
                },
            }, []),
            h('textarea', {
                style: { display: 'none' },
                attrs: {
                    collection: this.collection,
                },
                domProps: {
                    value: this.exportable,
                },
            }, []),
        ]);
    },

    computed: {
        exportable() {
            return pipe(
                this.value,
                media => reject(media, media => media.markedForRemoval === true),
                media => sortBy(media, 'orderColumn'),
                media => JSON.stringify(media)
            );
        },
    },
};
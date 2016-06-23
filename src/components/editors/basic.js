import editor from './editor';

export default {

    template: `
        <div>
            <input v-model="name" />
        </div>
    `,

    mixins: [editor],

};

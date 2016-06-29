import editor from './editor';

export default {

    template: `
        <div>
            <input v-model="name"
                   :disabled="media.markedForRemoval"
            />
        </div>
    `,

    mixins: [editor],

};

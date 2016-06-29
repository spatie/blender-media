import editor from './editor';

export default {

    template: `
        <div class="media__editor">
            <span class="media__editor__column -stretch">
                <input
                    class="media__form__text"
                    :disabled="media.markedForRemoval"
                    type="text"
                    v-model="name"
                />
            </span>
        </div>
    `,

    mixins: [editor],

};

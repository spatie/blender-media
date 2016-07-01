import editor from './editor';

export default {

    template: `
        <div class="media__editor">
            <span class="media__editor__column -stretch">
                <input
                    class="media__input--text"
                    :disabled="media.markedForRemoval"
                    type="text"
                    v-model="name"
                    @keydown.enter.prevent="blurInput"
                />
            </span>
        </div>
    `,

    mixins: [editor],

    methods: {
        blurInput(event) {
            event.target.blur();
        },
    }

};

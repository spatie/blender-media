<template>
    <div class="media__editor">
        <span class="media__editor__column -stacked">
            <label
                class="media__input__label"
            >
                Bestand
            </label>
            <input
                class="media__input--text"
                :disabled="media.markedForRemoval"
                type="text"
                v-model="media.name"
                @keydown.enter.prevent="blurInput"
            ><br>
            <label class="media__input__label">Grootte</label>
            <select :value=width @change="updateWidth($event)">
                <option value="1">Volledige breedte</option>
                <option value="2/3">2/3</option>
                <option value="1/2">1/2</option>
                <option value="1/3">1/3</option>
            </select>
            <br>
        </span>
    </div>
</template>

<script>
import editor from './editor';

export default {

    mixins: [editor],

    customProperties: {
        width: '1',
    },

    computed: {
        width() {
            return this.customProperty('width');
        },
    },

    methods: {
        updateWidth(event) {
            this.setCustomProperty('width', event.target.value);
        },
    },
};
</script>

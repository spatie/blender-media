<template>
    <div class="media__editor">
        <span class="media__editor__column -stretch">
            <input
                class="media__input--text"
                :disabled="media.markedForRemoval"
                type="text"
                v-model="media.name"
                @keydown.enter.prevent="blurInput"
            />
        </span>
    </div>
</template>

<script>
export default {

    props: ['media'],

    methods: {
        blurInput(event) {
            event.target.blur();
        },
    },
};
</script>

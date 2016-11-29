<template>
    <div
        v-if="hasError"
        class="media__alert -error"
    >
        <div class="media__alert__message">
            {{ text }}
        </div>
        <a
            href="#"
            class="media__alert__delete"
            @click.prevent="clearError"
        >
            <i class="fa fa-remove"></i>
        </a>
    </div>
</template>

<script>
export default {

    props: ['text'],

    computed: {
        hasError() {
            return this.text !== '';
        },
    },

    methods: {
        clearError() {
            this.$emit('clear-error');
        },
    },
};
</script>

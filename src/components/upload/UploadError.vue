<template>
    <div
        v-if="hasError"
        class="media__alert -error"
    >
        <div class="media__alert__message" >
            {{ error }}
        </div>
        <a
            href="#"
            class="media__alert__delete"
            @click.prevent="clearErrors(collection)"
        >
            <i class="fa fa-remove"></i>
        </a>
    </div>
</template>

<script>
export default {

    methods: {
        clearErrors(collection) {
            this.$store.commit('clearError', { collection });
        },
    },

    computed: {
        error() {
            return this.$store.state.uploads.error;
        },
        hasError() {
            return this.error !== '';
        },
    },
};
</script>

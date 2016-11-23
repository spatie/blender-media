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
            @click.prevent="clearError"
        >
            <i class="fa fa-remove"></i>
        </a>
    </div>
</template>

<script>
import { inject } from 'vue-expose-inject';

export default {

    computed: {
        ...inject(['store']),
        error() {
            return this.store.error;
        },
        hasError() {
            return this.error !== '';
        },
    },

    methods: {
        clearError() {
            this.store.clearError();
        },
    },
};
</script>

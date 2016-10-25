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
import inject from '../../mixins/inject';

export default {

    mixins: [
        inject('uploads'),
    ],

    computed: {
        error() {
            return this.$uploads.error;
        },
        hasError() {
            return this.error !== '';
        },
    },

    methods: {
        clearError() {
            this.$uploads.clearError();
        },
    },
};
</script>

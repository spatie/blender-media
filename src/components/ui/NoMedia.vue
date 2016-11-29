<template>
    <div class="media__alert">
        {{ trans('noMedia') }}
    </div>
</template>

<script>
import trans from '../../lib/trans';

export default {
    
    methods: {
        trans,
    },
};
</script>
<script setup lang="ts">
defineProps<{
    class?: string;
}>();
</script>

<template>
    <div :class="['bg-dark/5 rounded-2xl', $props.class]"></div>
</template>

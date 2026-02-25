<script setup lang="ts">
import Skeleton from './Skeleton.vue';
</script>

<template>
    <div class="bg-white rounded-2xl overflow-hidden border border-dark/5 shadow-soft">
        <Skeleton class="aspect-[2/3] rounded-none" />
        <div class="p-4 space-y-2">
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-3 w-1/2" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ImageOff } from 'lucide-vue-next';

defineProps<{
    src: string;
    alt: string;
    class?: string;
}>();

const hasError = ref(false);
const isLoading = ref(true);

const handleError = () => {
    hasError.value = true;
    isLoading.value = false;
};

const handleLoad = () => {
    isLoading.value = false;
};
</script>

<template>
    <div :class="['relative overflow-hidden bg-dark/5', $props.class]">
        <div v-if="isLoading" class="absolute inset-0 animate-pulse bg-dark/10"></div>
        
        <img v-if="!hasError" :src="src" :alt="alt" 
            class="w-full h-full object-cover transition-opacity duration-300"
            :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }"
            @error="handleError" @load="handleLoad" 
            loading="lazy" />

        <div v-else class="flex flex-col items-center justify-center h-full text-dark/20 p-4 text-center">
            <ImageOff :size="32" />
            <span class="text-[10px] font-bold uppercase mt-2">Imagem indisponível</span>
        </div>
    </div>
</template>

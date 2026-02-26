<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';

defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
}>();
</script>

<template>
    <button :type="type || 'button'" :disabled="disabled || loading"
        class="w-full md:w-auto font-bold py-2.5 px-6 rounded-full transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed text-center inline-flex items-center justify-center gap-2"
        :class="{
            'bg-primary text-white shadow-soft hover:bg-primary-dark': variant === 'primary' || !variant,
            'bg-secondary text-white shadow-soft hover:bg-secondary-dark': variant === 'secondary',
            'border-2 border-primary text-primary hover:bg-primary/5': variant === 'outline',
            'text-primary hover:bg-primary/5': variant === 'ghost',
        }">
        <Loader2 v-if="loading" class="animate-spin" :size="20" />
        <slot />
    </button>
</template>

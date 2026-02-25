<script setup lang="ts">
defineProps<{
    modelValue: string | number;
    label?: string;
    type?: string;
    placeholder?: string;
    error?: string;
    id: string;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="flex flex-col gap-1.5 w-full">
        <label v-if="label" :for="id" class="text-sm font-semibold text-dark/70 ml-1">
            {{ label }}
        </label>
        <input :id="id" :type="type || 'text'" :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :placeholder="placeholder"
            class="bg-white border border-dark/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark placeholder:text-dark/30"
            :class="{ 'border-red-500 ring-red-500/10': error }" />
        <span v-if="error" class="text-xs text-red-500 font-medium ml-1">
            {{ error }}
        </span>
    </div>
</template>

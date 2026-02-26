<script setup lang="ts">
import type { Card } from '@/types';
import SafeImage from './SafeImage.vue';
import { Check, Plus, Trash2 } from 'lucide-vue-next';

defineProps<{
    card: Card;
    selectable?: boolean;
    selected?: boolean;
    deletable?: boolean;
}>();

defineEmits(['select', 'delete']);
</script>

<template>
    <div :class="[
        'group relative bg-white rounded-2xl overflow-hidden shadow-soft border border-dark/5 transition-all',
        selected ? 'ring-2 ring-primary border-transparent' : '',
        selectable ? 'cursor-pointer' : ''
    ]" @click="selectable ? $emit('select', card) : null">
        <div class="aspect-[2/3] overflow-hidden bg-surface relative">
            <SafeImage :src="card.imageUrl" :alt="card.name" class="w-full h-full  transition-transform duration-500" />

            <div v-if="selectable"
                class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors"
                :class="selected ? 'bg-primary text-white' : 'bg-white/80 backdrop-blur-md text-dark group-hover:bg-primary group-hover:text-white'">
                <Check v-if="selected" :size="16" />
                <Plus v-else :size="16" />
            </div>

        </div>

        <div class="p-4 bg-white border-t border-dark/5">
            <h3 class="font-bold text-sm truncate text-dark">{{ card.name }}</h3>
            <p class="text-[10px] text-dark/40 truncate uppercase font-semibold mt-1">ID: #{{ card.id.slice(-6) }}</p>
        </div>
    </div>
</template>

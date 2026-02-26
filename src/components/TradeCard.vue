<script setup lang="ts">
import { computed } from 'vue';
import type { Trade } from '@/types';
import { ArrowRightLeft, Trash2, User as UserIcon } from 'lucide-vue-next';

const props = defineProps<{
    trade: Trade;
    isOwner?: boolean;
}>();

defineEmits(['delete']);

const offering = props.trade.tradeCards.filter(c => c.type === 'OFFERING');
const receiving = props.trade.tradeCards.filter(c => c.type === 'RECEIVING');

const isMobileRow = computed(() => props.trade.tradeCards.length <= 2);
</script>

<template>
    <div class="bg-white rounded-3xl overflow-hidden shadow-soft border border-dark/5 flex flex-col group">

        <div class="px-6 py-4 border-b border-dark/5 flex justify-between items-center bg-surface/10">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-dark/5 flex items-center justify-center text-dark/40">
                    <UserIcon :size="16" />
                </div>
                <div class="flex flex-col">
                    <span class="text-xs font-bold text-dark">{{ trade.user.name }}</span>
                    <span class="text-[10px] text-dark/40 uppercase font-bold tracking-tighter">Proponente</span>
                </div>
            </div>

            <button v-if="isOwner" @click="$emit('delete')" class="p-2 rounded-xl text-red-500 hover:bg-red-50"
                title="Excluir Troca">
                <Trash2 :size="18" />
            </button>
            <span v-else class="text-[10px] font-bold text-dark/20 uppercase tracking-widest">Ativo</span>
        </div>

        <div :class="[
            'p-4 py-8 h-full items-center justify-center gap-4',
            isMobileRow ? 'flex flex-row' : 'flex flex-col',
            'md:grid md:grid-cols-[1fr_auto_1fr]'
        ]">
            <div class="flex flex-col align-start space-y-3 h-full">
                <p class="text-xs font-black text-center text-primary uppercase tracking-[0.2em] mb-2 px-3">Oferece</p>
                <div class="flex flex-wrap gap-2 justify-center overflow-y-auto max-h-[230px]">
                    <div v-for="tc in offering" :key="tc.id"
                        class="flex flex-col items-center w-[110px] gap-2 bg-primary/5 border border-primary/10 rounded-xl p-2 pr-2 tooltip"
                        :title="tc.card.name">
                        <img :src="tc.card.imageUrl" class="w-24 aspect-[2/3] object-cover shadow-sm" />
                        <span class="text-[8px] font-bold text-primary max-w-[80px] truncate">{{ tc.card.name }}</span>
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <div :class="[
                    'w-12 h-12 bg-surface rounded-full flex items-center justify-center text-dark/30 group-hover:text-primary border border-dark/5',
                    isMobileRow ? 'rotate-0' : 'rotate-90',
                    'md:rotate-0'
                ]">
                    <ArrowRightLeft :size="24" />
                </div>
            </div>

            <div class="flex flex-col align-start space-y-3 h-full">
                <p class="text-xs font-black text-center text-secondary uppercase tracking-[0.2em] mb-2 px-3">Deseja</p>
                <div class="flex flex-wrap gap-2 justify-center overflow-y-auto max-h-[230px]">
                    <div v-for="tc in receiving" :key="tc.id"
                        class="flex flex-col items-center w-[110px] gap-2 bg-secondary/5 border border-secondary/10 rounded-xl p-2 pr-2"
                        :title="tc.card.name">
                        <img :src="tc.card.imageUrl" class="w-24 aspect-[2/3] object-cover shadow-sm" />
                        <span class="text-[8px] font-bold text-secondary max-w-[80px] truncate">{{ tc.card.name
                            }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

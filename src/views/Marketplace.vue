<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTradeStore } from '@/store/trades';
import { useCardStore } from '@/store/cards';
import { useAuthStore } from '@/store/auth';
import TradeModal from '@/components/TradeModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import TradeCard from '@/components/TradeCard.vue';
import CardSkeleton from '@/components/CardSkeleton.vue';
import Skeleton from '@/components/Skeleton.vue';
import { Plus, ArrowRightLeft, LayoutGrid, Info, ChevronDown } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const tradeStore = useTradeStore();
const cardStore = useCardStore();
const authStore = useAuthStore();

const isModalOpen = ref(false);

const handleDelete = async (tradeId: string | number) => {
    if (confirm('Tem certeza que deseja excluir esta proposta?')) {
        try {
            await tradeStore.deleteTrade(String(tradeId));
            toast.success('Proposta de troca removida com sucesso!');
        } catch (err) {
            toast.error('Erro ao excluir proposta. Tente novamente.');
        }
    }
};

onMounted(() => {
    tradeStore.fetchTrades(1, false);
    cardStore.fetchGlobalCards();
    if (authStore.isAuthenticated) {
        cardStore.fetchMyCards();
    }
});
</script>

<template>
    <div class="space-y-6">
        <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-3xl shadow-soft border border-dark/5">
            <div>
                <h1 class="text-xl font-black text-dark tracking-tight">
                    Marketplace <span class="text-primary italic">Global</span>
                </h1>
                <p class="text-dark/40 font-semibold mt-2 flex items-center gap-2">
                    <LayoutGrid :size="16" /> {{ tradeStore.trades.length }} Trocas encontradas
                </p>
            </div>
            <BaseButton v-if="authStore.isAuthenticated" @click="isModalOpen = true" class="px-10 h-14 text-sm shadow-primary/20 shadow-lg">
                <Plus :size="24" /> Criar Proposta
            </BaseButton>
        </div>

        <div v-if="tradeStore.isLoading && tradeStore.trades.length === 0"
            class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="i in 4" :key="i" class="bg-white p-6 rounded-3xl border border-dark/5 flex gap-4">
                <CardSkeleton class="w-1/3 aspect-[2/3]" />
                <div class="flex-grow space-y-4 py-2">
                    <Skeleton class="h-6 w-3/4" />
                    <Skeleton class="h-4 w-1/2" />
                    <div class="flex gap-2">
                        <Skeleton class="h-10 w-24" />
                        <Skeleton class="h-10 w-24" />
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="tradeStore.trades.length === 0" class="text-center py-24 glass-panel border-dashed">
            <Info :size="48" class="mx-auto text-dark/10 mb-4" />
            <h2 class="text-2xl font-bold text-dark/30">Nenhuma troca aberta</h2>
            <p class="text-dark/20 mt-2">Clique em "Criar Proposta" para começar!</p>
        </div>

        <div v-else class="space-y-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TradeCard v-for="trade in tradeStore.trades" :key="trade.id" :trade="trade"
                    :is-owner="trade.userId === authStore.user?.id" @delete="handleDelete(trade.id)" />
            </div>

            <div v-if="tradeStore.hasMore" class="flex justify-center pt-4">
                <BaseButton variant="outline" @click="tradeStore.loadMore" :disabled="tradeStore.isLoading" class="px-12 group">
                    <ChevronDown :size="20" />
                    {{ tradeStore.isLoading ? 'Carregando...' : 'Carregar mais trocas' }}
                </BaseButton>
            </div>
        </div>

        <div v-if="!authStore.isAuthenticated"
            class="bg-gradient-to-r from-primary to-primary-dark p-8 rounded-3xl text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div class="relative z-10">
                <h2 class="text-2xl font-black mb-2 flex items-center justify-center gap-2">
                    <ArrowRightLeft :size="24" /> Quer participar?
                </h2>
                <p class="text-white/80 font-medium md:w-auto text-center">Crie sua conta agora para gerenciar sua coleção e criar trocas!</p>
            </div>
            <router-link to="/register"
                class="relative z-10 w-full md:w-auto text-center px-8 py-4 bg-white text-primary font-black rounded-2xl hover:bg-surface shadow-md whitespace-nowrap">
                Criar conta
            </router-link>
            <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <TradeModal v-if="isModalOpen" @close="isModalOpen = false" />
    </div>
</template>

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
import { Plus, LayoutGrid, Info, ChevronDown, Sparkles, TrendingUp, UserPlus } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

const tradeStore = useTradeStore();
const cardStore = useCardStore();
const authStore = useAuthStore();

const isModalOpen = ref(false);

const splideOptions = {
    type: 'loop',
    autoplay: true,
    interval: 5000,
    arrows: false,
    pagination: true,
    pauseOnHover: true,
    gap: '1rem',
};

const banners = [
    {
        id: 1,
        image: '/banner1.png',
        desktopImage: '/banner1-desktop.png',
        title: 'MarketTask Pro',
        description: 'A melhor experiência em trocas de TCG do Brasil.',
        tag: 'Destaque'
    },
    {
        id: 2,
        image: '/banner2.png',
        desktopImage: '/banner2-desktop.png',
        title: 'Nova Coleção em Breve',
        description: 'Prepare suas cartas para as trocas mais épicas.',
        tag: 'Novidade'
    }
];

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
    <div class="space-y-8 pb-12">
        <section class="rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group">
            <Splide :options="splideOptions" aria-label="MarketTask Promotions">
                <SplideSlide v-for="banner in banners" :key="banner.id">
                    <div class="relative h-[420px] md:h-[560px] w-full overflow-hidden">
                        <picture class="absolute inset-0">
                            <source media="(min-width: 768px)" :srcset="banner.desktopImage" />
                            <img :src="banner.image" :alt="banner.title"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </picture>
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                            <span
                                class="bg-primary text-white text-[10px] uppercase font-black px-3 py-1 rounded-full w-fit mb-3 tracking-widest animate-pulse">
                                {{ banner.tag }}
                            </span>
                            <h2 class="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                                {{ banner.title }}
                            </h2>
                            <p class="text-white/70 font-medium text-sm md:text-lg max-w-xl">
                                {{ banner.description }}
                            </p>
                        </div>
                    </div>
                </SplideSlide>
            </Splide>
        </section>

        <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-3xl shadow-soft border border-dark/5 transition-all">
            <div class="flex items-center gap-5">
                <div>
                    <h1 class="text-2xl font-black text-dark tracking-tight flex items-center gap-2">
                        Marketplace <span class="text-primary italic">Global</span>
                    </h1>
                    <div class="flex items-center gap-3 mt-1">
                        <span
                            class="flex items-center gap-1.5 text-dark/40 font-bold text-sm bg-dark/5 px-3 py-1 rounded-lg">
                            <LayoutGrid :size="14" /> {{ tradeStore.totalTrades }} Disponíveis
                        </span>
                        <span v-if="tradeStore.isLoading"
                            class="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
                    </div>
                </div>
            </div>
            <BaseButton v-if="authStore.isAuthenticated" @click="isModalOpen = true"
                class="w-full md:w-auto px-10 h-14 text-sm shadow-primary/20 shadow-lg group">
                <Plus :size="24" class="group-hover:rotate-90 transition-transform" /> Criar Proposta
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

        <div v-else-if="tradeStore.trades.length === 0" class="text-center py-24 glass-panel border-dashed p-12">
            <Info :size="64" class="mx-auto text-primary/20 mb-6" />
            <h2 class="text-3xl font-black text-dark/40">Nenhuma troca aberta</h2>
            <p class="text-dark/20 mt-3 font-semibold">Seja o primeiro a publicar! Clique em "Criar Proposta" para
                começar.</p>
        </div>

        <div v-else class="space-y-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TradeCard v-for="trade in tradeStore.trades" :key="trade.id" :trade="trade"
                    :is-owner="trade.userId === authStore.user?.id" @delete="handleDelete(trade.id)" />
            </div>

            <div v-if="tradeStore.hasMore" class="flex justify-center pt-8">
                <BaseButton variant="outline" @click="tradeStore.loadMore" :disabled="tradeStore.isLoading"
                    class="px-16 group h-14 rounded-2xl border-2 hover:bg-primary hover:border-primary transition-all">
                    {{ tradeStore.isLoading ? 'Carregando...' : 'Carregar mais' }}
                </BaseButton>
            </div>
        </div>

        <div v-if="!authStore.isAuthenticated"
            class="mt-16 p-8 md:p-12 rounded-3xl from-primary/10 via-white to-secondary/5 border border-primary/10 shadow-xl relative overflow-hidden group">
            <div
                class="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700">
            </div>
            <div class="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-secondary/5 rounded-full blur-2xl"></div>

            <div class="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="text-center md:text-left space-y-4 max-w-2x1">
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        Junte-se à nossa comunidade
                    </div>
                    <h2 class="text-2xl md:text-2xl font-black text-dark leading-tight">
                        Pronto para começar suas <span class="text-primary">trocas épicas?</span>
                    </h2>
                    <p class="text-dark/60 text-sm md:text-sm font-medium">
                        Crie sua conta agora para publicar suas próprias ofertas, gerenciar sua coleção e negociar com
                        treinadores de todo o Brasil.
                    </p>
                </div>

                <router-link to="/register" class="w-full md:w-auto">
                    <BaseButton
                        class="w-full md:w-auto px-12 h-16 text-primary shadow-primary/20 shadow-xl hover:shadow-2xl transition-all">
                        Criar minha conta grátis
                    </BaseButton>
                </router-link>
            </div>
        </div>

        <TradeModal v-if="isModalOpen" @close="isModalOpen = false" />
    </div>
</template>

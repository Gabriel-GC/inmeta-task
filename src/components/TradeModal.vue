<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useCardStore } from '@/store/cards';
import { useTradeStore } from '@/store/trades';
import CardItem from './CardItem.vue';
import BaseButton from './BaseButton.vue';
import { X, ArrowRightLeft, Search } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import type { Card } from '@/types';
import { debounce } from 'lodash-es';

const emit = defineEmits(['close']);

const cardStore = useCardStore();
const tradeStore = useTradeStore();

const step = ref(1);
const selectedOffering = ref<string[]>([]);
const selectedReceiving = ref<string[]>([]);
const searchTerm = ref('');
const debouncedSearchTerm = ref('');

const updateSearch = debounce((val: string) => {
    debouncedSearchTerm.value = val;
}, 300);

const error = ref<string | null>(null);

onMounted(async () => {
    try {
        await Promise.all([
            cardStore.fetchMyCards(),
            cardStore.fetchGlobalCards()
        ]);
    } catch (err) {
        console.error("Erro ao carregar dados do modal:", err);
        error.value = "Não foi possível carregar as cartas. Tente novamente.";
    }
});

watch(searchTerm, (newVal) => {
    updateSearch(newVal);
});

const filteredGlobalCards = computed(() => {
    if (!debouncedSearchTerm.value) return cardStore.globalCards;
    return cardStore.globalCards.filter(c =>
        c.name.toLowerCase().includes(debouncedSearchTerm.value.toLowerCase())
    );
});

const toggleSelection = (cardId: string, list: 'offering' | 'receiving') => {
    const targetList = list === 'offering' ? selectedOffering : selectedReceiving;
    if (targetList.value.includes(cardId)) {
        targetList.value = targetList.value.filter(id => id !== cardId);
    } else {
        targetList.value.push(cardId);
    }
};

const handleCreateTrade = async () => {
    if (selectedOffering.value.length === 0 || selectedReceiving.value.length === 0) return;
    
    error.value = null;
    const cards = [
        ...selectedOffering.value.map(id => ({ cardId: id, type: 'OFFERING' as const })),
        ...selectedReceiving.value.map(id => ({ cardId: id, type: 'RECEIVING' as const })),
    ];

    try {
        await tradeStore.createTrade({ cards });
        toast.success('Proposta de troca criada com sucesso!');
        emit('close');
    } catch (err) {
        console.error(err);
        error.value = "Erro ao criar proposta de troca. Verifique sua conexão.";
    }
};
</script>

<template>
    <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 !mt-0">
        <div class="absolute inset-0 bg-dark/60 backdrop-blur-md" @click="$emit('close')"></div>

        <div
            class="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div class="p-6 border-b border-dark/5 flex justify-between items-center bg-surface">
                <div>
                    <h2 class="text-xl font-extrabold text-dark flex items-center gap-2">
                        <ArrowRightLeft class="text-primary" /> Propor Nova Troca
                    </h2>
                    <p class="text-xs text-dark/40 font-semibold uppercase tracking-widest mt-1">
                        Passo {{ step }} de 2
                    </p>
                </div>
                <button @click="$emit('close')" class="p-2 hover:bg-dark/5 rounded-full transition-colors">
                    <X :size="20" />
                </button>
            </div>

            <div class="flex-grow overflow-y-auto p-6 relative">
                <div v-if="cardStore.isLoading && step === 1 && cardStore.myCards.length === 0" 
                    class="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                    <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p class="text-dark/60 font-medium">Carregando sua coleção...</p>
                </div>

                <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
                    <span class="text-sm font-medium">{{ error }}</span>
                    <button @click="error = null" class="ml-auto p-1 hover:bg-red-100 rounded-lg">
                        <X :size="16" />
                    </button>
                </div>

                <div v-if="step === 1" class="space-y-6">
                    <div class="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                        <h3 class="font-bold text-primary flex items-center gap-2">
                            1. O que você está oferecendo?
                        </h3>
                        <p class="text-sm text-dark/70 mt-1">Selecione as cartas da sua coleção que deseja trocar.</p>
                    </div>

                    <div v-if="cardStore.myCards.length === 0" class="text-center py-12">
                        <p class="text-dark/40 font-medium">Sua coleção está vazia. Adicione cartas primeiro!</p>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <CardItem v-for="card in cardStore.myCards" :key="card.id" :card="card" selectable
                            :selected="selectedOffering.includes(card.id)"
                            @select="toggleSelection(card.id, 'offering')" />
                    </div>
                </div>

                <div v-else class="space-y-6">
                    <div class="bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                        <h3 class="font-bold text-secondary flex items-center gap-2">
                            2. O que você quer receber?
                        </h3>
                        <p class="text-sm text-dark/70 mt-1">Selecione as cartas do mercado que deseja em troca.</p>
                    </div>

                    <div class="relative">
                        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" :size="18" />
                        <input v-model="searchTerm" type="text" placeholder="Pesquisar cartas no mercado..."
                            class="w-full bg-surface border-0 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-secondary/20 transition-all font-medium" />
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <CardItem v-for="card in filteredGlobalCards" :key="card.id" :card="card" selectable
                            :selected="selectedReceiving.includes(card.id)"
                            @select="toggleSelection(card.id, 'receiving')" />
                    </div>
                </div>
            </div>

            <div class="text-dark/60 hover:text-primary transition-colors flex flex-col-reverse md:flex-row p-6 items-center justify-center md:justify-between text-center md:text-left gap-6 text-sm font-medium">
                <BaseButton v-if="step === 2" variant="outline" @click="step = 1">
                    Voltar
                </BaseButton>
                <div v-else></div>

                <div class="flex items-center gap-4">
                    <span class="text-xs font-bold text-dark/40">
                        {{ selectedOffering.length }} Oferta(s) / {{ selectedReceiving.length }} Desejo(s)
                    </span>

                    <BaseButton v-if="step === 1" :disabled="selectedOffering.length === 0 || cardStore.isLoading" @click="step = 2">
                        Próximo Passo
                    </BaseButton>

                    <BaseButton v-else variant="secondary" :disabled="selectedReceiving.length === 0 || tradeStore.isLoading"
                        :loading="tradeStore.isLoading" @click="handleCreateTrade">
                        Finalizar Proposta
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCardStore } from '@/store/cards';
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';
import CardItem from './CardItem.vue';
import BaseButton from './BaseButton.vue';
import { X, Plus, Sparkles, Search, RefreshCcw, Info } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const emit = defineEmits(['close']);

const cardStore = useCardStore();
const selectedCardIds = ref<string[]>([]);
const searchQuery = ref('');
const loader = ref<HTMLElement | null>(null);
const isAdding = ref(false);

const filteredGlobalCards = computed(() => {
    if (!searchQuery.value) return cardStore.globalCards;
    return cardStore.globalCards.filter(card =>
        card.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const selectCard = (card: any) => {
    const index = selectedCardIds.value.indexOf(card.id);
    if (index > -1) {
        selectedCardIds.value.splice(index, 1);
    } else {
        selectedCardIds.value.push(card.id);
    }
};

useInfiniteScroll(loader, () => {
    if (!cardStore.isLoading && cardStore.hasMoreGlobal) {
        cardStore.fetchGlobalCards();
    }
});

onMounted(() => {
    cardStore.fetchGlobalCards(true);
});

const handleAddCard = async () => {
    if (selectedCardIds.value.length === 0) return;
    isAdding.value = true;
    try {
        await cardStore.addCard(selectedCardIds.value);
        toast.success('Cartas adicionadas à sua coleção!');
        selectedCardIds.value = [];
        emit('close');
    } catch (err) {
        console.error("Erro ao adicionar carta:", err);
        toast.error('Erro ao adicionar carta. Tente novamente.');
    } finally {
        isAdding.value = false;
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
                    <h2 class="text-lg font-extrabold text-dark flex items-center gap-2">
                        Adicionar Novas Cartas
                    </h2>
                    <p class="text-xs text-dark/40 font-semibold  tracking-widest mt-1">
                        Selecione cartas da biblioteca global
                    </p>
                </div>
                <button @click="$emit('close')" class="p-2 hover:bg-dark/5 rounded-full transition-colors">
                    <X :size="20" />
                </button>
            </div>

            <div class="flex-grow overflow-y-auto p-6 relative">
                <div class="flex flex-col gap-8">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 class="text-lg font-bold text-dark flex items-center gap-2">
                                <Sparkles class="text-primary" :size="20" />
                                Escolha suas novas cartas
                            </h3>
                            <p class="text-sm text-dark/50 mt-1">Selecione uma ou mais cartas para vincular à sua
                                coleção</p>
                        </div>

                        <div class="relative w-full md:w-72">
                            <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" :size="18" />
                            <input v-model="searchQuery" type="text" placeholder="Buscar por nome..."
                                class="w-full bg-dark/5 border-none rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
                        </div>
                    </div>

                    <div v-if="filteredGlobalCards.length > 0"
                        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pr-2 custom-scrollbar">
                        <div v-for="card in filteredGlobalCards" :key="card.id" @click="selectCard(card)"
                            class="cursor-pointer transition-all">
                            <CardItem :card="card" :selectable="true" :selected="selectedCardIds.includes(card.id)" />
                        </div>
                    </div>

                    <div v-else-if="!cardStore.isLoading" class="py-20 text-center space-y-4 bg-dark/5 rounded-2xl">
                        <div
                            class="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center text-dark/20 shadow-soft">
                            <Search :size="32" />
                        </div>
                        <p class="text-dark/40 font-semibold">Nenhuma carta encontrada para "{{ searchQuery }}"</p>
                    </div>

                    <!-- Sentinel for infinite scroll -->
                    <div ref="loader" class="flex justify-center py-4 w-full">
                        <div v-if="cardStore.isLoading" class="flex items-center gap-2 text-primary">
                            <RefreshCcw :size="20" class="animate-spin" />
                            <span class="text-xs font-semibold uppercase tracking-wider">Carregando mais...</span>
                        </div>
                        <div v-else-if="!cardStore.hasMoreGlobal && filteredGlobalCards.length > 0" class="text-dark/30 text-xs font-semibold uppercase tracking-wider">
                            Fim da biblioteca
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border-t border-dark/5 bg-surface">
                <div
                    class="flex items-center gap-3 text-dark/60 text-sm bg-primary/5 px-4 py-2 rounded-lg w-full md:w-auto">
                    <Info :size="16" class="text-primary" />
                    <span v-if="selectedCardIds.length === 0">Selecione pelo menos uma carta</span>
                    <span v-else class="font-bold text-dark">{{ selectedCardIds.length }} {{ selectedCardIds.length ===
                        1 ? 'carta selecionada' : 'cartas selecionadas' }}</span>
                </div>

                <div class="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <BaseButton variant="ghost" @click="$emit('close')" class="flex-1 md:flex-none md:px-8">
                        Cancelar
                    </BaseButton>
                    <BaseButton @click="handleAddCard" :disabled="selectedCardIds.length === 0 || isAdding"
                        class="flex-1 md:flex-none md:px-10 min-w-[200px] h-12 shadow-primary/20 shadow-lg">
                        <template v-if="isAdding">
                            <RefreshCcw :size="18" class="animate-spin" /> Adicionando...
                        </template>
                        <template v-else>
                            <Plus :size="18" /> {{ selectedCardIds.length > 1 ? 'Vincular Todas' : 'Vincular Coleção' }}
                        </template>
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

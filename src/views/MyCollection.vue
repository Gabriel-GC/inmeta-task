<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useCardStore } from '@/store/cards';
import CardItem from '@/components/CardItem.vue';
import CardSkeleton from '@/components/CardSkeleton.vue';
import BaseButton from '@/components/BaseButton.vue';
import { Plus, Wallet, Sparkles, RefreshCcw, Search, Info, Trash2 } from 'lucide-vue-next';

const cardStore = useCardStore();
const showAddForm = ref(false);
const selectedCardIds = ref<string[]>([]);
const searchQuery = ref('');
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

onMounted(() => {
    cardStore.fetchMyCards();
    cardStore.fetchGlobalCards();
});

const handleAddCard = async () => {
    if (selectedCardIds.value.length === 0) return;
    isAdding.value = true;
    try {
        await cardStore.addCard(selectedCardIds.value);
        selectedCardIds.value = [];
        showAddForm.value = false;
        searchQuery.value = '';
    } catch (err) {
        console.error("Erro ao adicionar carta:", err);
    } finally {
        isAdding.value = false;
    }
};

const handleDeleteCard = async (card: any) => {
    if (!confirm(`Tem certeza que deseja excluir a carta "${card.name}"?`)) return;
    try {
        await cardStore.removeCard(card.id);
    } catch (err) {
        console.error("Erro ao excluir carta:", err);
    }
};
</script>

<template>
    <div class="space-y-6">
        <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-3xl shadow-soft border border-dark/5">
            <div class="flex items-center gap-4">
                <div>
                    <h1 class="text-xl font-black text-dark tracking-tight">Minha <span
                            class="text-primary italic">Coleção</span></h1>
                    <p class="text-dark/40 font-semibold mt-1 flex items-center gap-2">
                         <Sparkles :size="16" /> {{ cardStore.myCards.length }} cartas únicas
                    </p>
                </div>
            </div>
            <BaseButton @click="showAddForm = !showAddForm" class="px-10 h-14 text-sm shadow-primary/20 shadow-lg">
                <Plus :size="24" /> {{ showAddForm ? 'Cancelar' : 'Adicionar Carta' }}
            </BaseButton>
        </div>

        <transition name="slide">
            <div v-if="showAddForm" class="bg-white rounded-3xl p-4 border border-dark/5 shadow-xl overflow-hidden relative">
                <div class="absolute top-0 left-0 w-full h-1.5 bg-primary/10">
                    <div class="h-full bg-primary transition-all duration-300" :style="{ width: selectedCardIds.length > 0 ? '100%' : '50%' }"></div>
                </div>

                <div class="flex flex-col gap-8">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <div>
                            <h2 class="text-xl font-bold text-dark flex items-center gap-2">
                                <Sparkles class="text-primary" :size="20" />
                                Escolha suas novas cartas
                            </h2>
                            <p class="text-sm text-dark/50 mt-1">Selecione uma ou mais cartas para vincular à sua coleção</p>
                        </div>

                        <div class="relative w-full md:w-72">
                            <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" :size="18" />
                            <input v-model="searchQuery" type="text" placeholder="Buscar por nome..."
                                class="w-full bg-dark/5 border-none rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
                        </div>
                    </div>

                    <div v-if="filteredGlobalCards.length > 0" 
                        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar p-4">
                        <div v-for="card in filteredGlobalCards" :key="card.id" 
                            @click="selectCard(card)"
                            class="cursor-pointer transition-all">
                            <CardItem 
                                :card="card" 
                                :selectable="true" 
                                :selected="selectedCardIds.includes(card.id)"
                            />
                        </div>
                    </div>

                    <div v-else class="py-20 text-center space-y-4 bg-dark/5 rounded-2xl">
                        <div class="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center text-dark/20 shadow-soft">
                            <Search :size="32" />
                        </div>
                        <p class="text-dark/40 font-semibold">Nenhuma carta encontrada para "{{ searchQuery }}"</p>
                    </div>

                    <div class="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-dark/5">
                        <div class="flex items-center gap-3 text-dark/60 text-sm bg-primary/5 px-4 py-2 rounded-lg w-full md:w-auto">
                            <Info :size="16" class="text-primary" />
                            <span v-if="selectedCardIds.length === 0">Selecione pelo menos uma carta</span>
                            <span v-else class="font-bold text-dark">{{ selectedCardIds.length }} {{ selectedCardIds.length === 1 ? 'carta selecionada' : 'cartas selecionadas' }} pronta!</span>
                        </div>
                        
                        <div class="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                            <BaseButton variant="ghost" @click="showAddForm = false" class="flex-1 md:flex-none md:px-8">
                                Cancelar
                            </BaseButton>
                            <BaseButton @click="handleAddCard" :disabled="selectedCardIds.length === 0 || isAdding" class="flex-1 md:flex-none md:px-10 min-w-[200px] h-14 shadow-primary/20 shadow-lg">
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
        </transition>

        <div v-if="cardStore.isLoading && cardStore.myCards.length === 0"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            <CardSkeleton v-for="i in 12" :key="i" class="scale-95" />
        </div>

        <div v-else-if="cardStore.myCards.length === 0" class="text-center py-32 space-y-4">
            <div class="w-20 h-20 bg-dark/5 rounded-full mx-auto flex items-center justify-center text-dark/10">
                <RefreshCcw :size="40" />
            </div>
            <h2 class="text-2xl font-bold text-dark/40">Sua coleção está vazia</h2>
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            <CardItem v-for="card in cardStore.myCards" :key="card.id" :card="card" :deletable="true" @delete="handleDeleteCard" class="scale-95 hover:scale-100 transition-transform" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCardStore } from '@/store/cards';
import CardItem from '@/components/CardItem.vue';
import CardSkeleton from '@/components/CardSkeleton.vue';
import BaseButton from '@/components/BaseButton.vue';
import AddCardModal from '@/components/AddCardModal.vue';
import { Plus, Sparkles, RefreshCcw } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const cardStore = useCardStore();
const showAddForm = ref(false);

onMounted(() => {
    cardStore.fetchMyCards();
    cardStore.fetchGlobalCards();
});

const handleDeleteCard = async (card: any) => {
    if (!confirm(`Tem certeza que deseja excluir a carta "${card.name}"?`)) return;
    try {
        await cardStore.removeCard(card.id);
        toast.success(`Carta "${card.name}" removida da coleção.`);
    } catch (err) {
        console.error("Erro ao excluir carta:", err);
        toast.error('Erro ao remover carta. Tente novamente.');
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
            <BaseButton @click="showAddForm = true" class="px-10 h-14 text-sm shadow-primary/20 shadow-lg">
                <Plus :size="24" /> Adicionar Carta
            </BaseButton>
        </div>

        <AddCardModal v-if="showAddForm" @close="showAddForm = false" />

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
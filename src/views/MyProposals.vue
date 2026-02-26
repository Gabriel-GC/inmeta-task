<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useTradeStore } from '@/store/trades';
import { useAuthStore } from '@/store/auth';
import TradeCard from '@/components/TradeCard.vue';
import { ArrowRightLeft, Info, History } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const tradeStore = useTradeStore();
const authStore = useAuthStore();

const myTrades = computed(() => {
	return tradeStore.trades.filter(trade => trade.userId === authStore.user?.id);
});

const handleDelete = async (tradeId: string) => {
	if (confirm('Tem certeza que deseja excluir esta proposta?')) {
		try {
			await tradeStore.deleteTrade(tradeId);
			toast.success('Proposta de troca removida com sucesso!');
		} catch (err) {
			toast.error('Erro ao excluir proposta. Tente novamente.');
		}
	}
};

onMounted(() => {
	tradeStore.fetchTrades();
});
</script>

<template>
	<div class="space-y-4">
		<div
			class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-3xl shadow-soft border border-dark/5">
			<div>
				<h1 class="text-xl font-black text-dark tracking-tight">
					Minhas <span class="text-primary italic">Propostas</span>
				</h1>
				<p class="text-dark/40 font-semibold mt-2 flex items-center gap-2">
					<History :size="16" /> {{ myTrades.length }} Propostas criadas por você
				</p>
			</div>
		</div>

		<div v-if="tradeStore.isLoading && tradeStore.trades.length === 0"
			class="flex items-center gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/20">
			<div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
				<ArrowRightLeft />
			</div>
			<div>
				<h3 class="font-bold text-primary">Carregando suas propostas...</h3>
				<p class="text-sm text-dark/70">Aguarde alguns segundos.</p>
			</div>
		</div>

		<div v-else-if="myTrades.length === 0" class="text-center py-24 glass-panel">
			<Info :size="48" class="mx-auto text-dark/20 mb-4" />
			<h2 class="text-2xl font-bold text-dark/40">Você ainda não tem propostas</h2>
			<p class="text-dark/30 mt-2">Vá ao Marketplace para criar uma nova proposta de troca!</p>
			<router-link to="/marketplace"
				class="mt-6 inline-flex items-center gap-2 text-primary font-bold hover:underline">
				Ir para o Marketplace
				<ArrowRightLeft :size="16" />
			</router-link>
		</div>

		<div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
			<TradeCard v-for="trade in myTrades" :key="trade.id" :trade="trade" :is-owner="true"
				@delete="handleDelete(trade.id)" />
		</div>
	</div>
</template>

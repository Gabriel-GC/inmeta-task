import { defineStore } from "pinia";
import { ref } from "vue";
import { tradeService } from "@/api/trade.service";
import type { Trade, CreateTradeDto } from "@/types";

export const useTradeStore = defineStore("trades", () => {
  const trades = ref<Trade[]>([]);
  const isLoading = ref(false);
  const currentPage = ref(1);
  const hasMore = ref(true);

  async function fetchTrades(page = 1, append = false) {
    isLoading.value = true;
    try {
      const response = await tradeService.listAll(page, 10);
      if (append) {
        trades.value = [...trades.value, ...response.list];
      } else {
        trades.value = response.list;
      }
      currentPage.value = page;
      hasMore.value = response.more;
    } catch (err) {
      console.error("Erro ao carregar trocas:", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function loadMore() {
    if (isLoading.value || !hasMore.value) return;
    await fetchTrades(currentPage.value + 1, true);
  }

  async function createTrade(tradeData: CreateTradeDto) {
    isLoading.value = true;
    try {
      const result = await tradeService.create(tradeData);
      await fetchTrades(1, false);
      return result;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteTrade(id: string) {
    await tradeService.delete(id);
    await fetchTrades(1, false);
  }

  return {
    trades,
    isLoading,
    hasMore,
    fetchTrades,
    loadMore,
    createTrade,
    deleteTrade,
  };
});

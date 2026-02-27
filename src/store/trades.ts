import { defineStore } from "pinia";
import { ref } from "vue";
import { tradeService } from "@/api/trade.service";
import type { Trade, CreateTradeDto } from "@/types";

export const useTradeStore = defineStore("trades", () => {
  const trades = ref<Trade[]>([]);
  const myTrades = ref<Trade[]>([]);
  const isLoading = ref(false);
  const currentPage = ref(1);
  const hasMore = ref(true);
  const totalTrades = ref(0);

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

      // Sync total trades - since API doesn't provide total, 
      // we do a quick check for the total count when fetching page 1
      if (page === 1) {
        updateTotalCount();
      }
    } catch (err) {
      console.error("Erro ao carregar trocas:", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function updateTotalCount() {
    try {
      // Fetch with a large RPP to get a better sense of the actual total
      // This is a workaround for the missing 'total' field in the API
      const response = await tradeService.listAll(1, 1000);
      totalTrades.value = response.list.length;
    } catch (err) {
      console.error("Erro ao atualizar contagem total:", err);
    }
  }

  async function fetchMyTrades() {
    isLoading.value = true;
    try {
      const allTrades: Trade[] = [];
      let page = 1;
      let more = true;

      const authStore = (await import("@/store/auth")).useAuthStore();
      const currentUserId = authStore.user?.id;

      if (!currentUserId) return;

      while (more) {
        const response = await tradeService.listAll(page, 100);
        allTrades.push(...response.list);
        more = response.more;
        page++;
        if (page > 20) break;
      }

      myTrades.value = allTrades.filter(t => t.userId === currentUserId);
    } catch (err) {
      console.error("Erro ao carregar minhas trocas:", err);
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
      await fetchMyTrades();
      await updateTotalCount();
      return result;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteTrade(id: string) {
    await tradeService.delete(id);
    await fetchTrades(1, false);
    await fetchMyTrades();
    await updateTotalCount();
  }

  return {
    trades,
    myTrades,
    isLoading,
    hasMore,
    totalTrades,
    fetchTrades,
    fetchMyTrades,
    loadMore,
    createTrade,
    deleteTrade,
    updateTotalCount,
  };
});

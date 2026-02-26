import { defineStore } from "pinia";
import { ref } from "vue";
import { cardService } from "@/api/card.service";
import type { Card } from "@/types";

export const useCardStore = defineStore("cards", () => {
  const myCards = ref<Card[]>([]);
  const globalCards = ref<Card[]>([]);
  const isLoading = ref(false);
  const currentPageGlobal = ref(1);
  const hasMoreGlobal = ref(true);

  async function fetchMyCards() {
    isLoading.value = true;
    try {
      myCards.value = await cardService.listMe();
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchGlobalCards(reset = false) {
    if (reset) {
      globalCards.value = [];
      currentPageGlobal.value = 1;
      hasMoreGlobal.value = true;
    }

    if (!hasMoreGlobal.value || isLoading.value) return;

    isLoading.value = true;
    try {
      const response = await cardService.listAll(currentPageGlobal.value, 10);
      globalCards.value = [...globalCards.value, ...response.list];
      hasMoreGlobal.value = response.more;
      currentPageGlobal.value++;
    } catch (err) {
      console.error("Erro ao carregar cartas globais:", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function addCard(cardIds: string | string[]) {
    const ids = Array.isArray(cardIds) ? cardIds : [cardIds];
    await cardService.addCard(ids);
    await fetchMyCards();
  }

  async function removeCard(cardId: string) {
    myCards.value = myCards.value.filter(card => card.id !== cardId);
  }

  return {
    myCards,
    globalCards,
    isLoading,
    hasMoreGlobal,
    fetchMyCards,
    fetchGlobalCards,
    addCard,
    removeCard,
  };
});

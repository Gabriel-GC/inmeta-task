import apiClient from "./client";
import type { Card } from "@/types";

export const cardService = {
  async listAll(page = 1, rpp = 10): Promise<{ list: Card[]; more: boolean }> {
    const { data } = await apiClient.get("/cards", {
      params: { page, rpp },
    });
    return data;
  },

  async listMe(): Promise<Card[]> {
    const { data } = await apiClient.get<Card[]>("/me/cards");
    return data;
  },

  async addCard(cardIds: string[]): Promise<void> {
    await apiClient.post("/me/cards", { cardIds });
  },

  async deleteCard(cardId: string): Promise<void> {
    await apiClient.delete(`/me/cards/${cardId}`);
  },
};

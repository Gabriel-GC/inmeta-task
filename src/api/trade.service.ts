import apiClient from "./client";
import type { Trade, CreateTradeDto, PaginatedResponse } from "@/types";

export const tradeService = {
  async listAll(page = 1, rpp = 10): Promise<PaginatedResponse<Trade>> {
    const { data } = await apiClient.get<PaginatedResponse<Trade>>("/trades", {
      params: { page, rpp },
    });
    return data;
  },

  async create(tradeData: CreateTradeDto): Promise<{ tradeId: string }> {
    const { data } = await apiClient.post("/trades", tradeData);
    return data;
  },

  async delete(tradeId: string): Promise<void> {
    await apiClient.delete(`/trades/${tradeId}`);
  },
};

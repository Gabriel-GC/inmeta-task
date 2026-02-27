import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTradeStore } from '@/store/trades';
import { useAuthStore } from '@/store/auth';
import { tradeService } from '@/api/trade.service';

vi.mock('@/api/trade.service', () => ({
    tradeService: {
        listAll: vi.fn(),
        create: vi.fn(),
        delete: vi.fn(),
    }
}));

vi.mock('@/store/auth', () => ({
    useAuthStore: vi.fn(() => ({
        user: { id: 'user1' },
        isAuthenticated: true
    }))
}));

describe('Trades Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.clearAllMocks();
    });

    it('should fetch user trades by aggregating global trades', async () => {
        const store = useTradeStore();

        // Mock 2 pages of global trades
        vi.mocked(tradeService.listAll)
            .mockResolvedValueOnce({
                list: [
                    { id: '1', userId: 'user1' },
                    { id: '2', userId: 'user2' }
                ] as any,
                more: true,
                page: 1,
                rpp: 100
            })
            .mockResolvedValueOnce({
                list: [
                    { id: '3', userId: 'user1' }
                ] as any,
                more: false,
                page: 2,
                rpp: 100
            });

        await store.fetchMyTrades();

        expect(tradeService.listAll).toHaveBeenCalledTimes(2);
        expect(store.myTrades).toHaveLength(2);
        expect(store.myTrades.map(t => t.id)).toEqual(['1', '3']);
    });

    it('should refresh myTrades when creating a trade', async () => {
        const store = useTradeStore();
        vi.mocked(tradeService.create).mockResolvedValue({ tradeId: 'new-id' });
        vi.mocked(tradeService.listAll).mockResolvedValue({ list: [], more: false, rpp: 100, page: 1 });

        await store.createTrade({ cards: [] });

        expect(tradeService.create).toHaveBeenCalled();
        expect(tradeService.listAll).toHaveBeenCalled(); // Should call fetchMyTrades which calls listAll
    });

    it('should refresh myTrades when deleting a trade', async () => {
        const store = useTradeStore();
        vi.mocked(tradeService.delete).mockResolvedValue(undefined);
        vi.mocked(tradeService.listAll).mockResolvedValue({ list: [], more: false, rpp: 100, page: 1 });

        await store.deleteTrade('1');

        expect(tradeService.delete).toHaveBeenCalledWith('1');
        expect(tradeService.listAll).toHaveBeenCalled(); // Should call fetchMyTrades which calls listAll
    });
});

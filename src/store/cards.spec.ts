import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCardStore } from '@/store/cards';
import { cardService } from '@/api/card.service';

vi.mock('@/api/card.service', () => ({
    cardService: {
        listAll: vi.fn(),
        listMe: vi.fn(),
        addCard: vi.fn(),
    }
}));

describe('Cards Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.clearAllMocks();
    });

    it('should fetch global cards page by page', async () => {
        const store = useCardStore();

        // Mocking 2 pages of response
        vi.mocked(cardService.listAll)
            .mockResolvedValueOnce({
                list: [{ id: '1', name: 'Card 1' } as any],
                more: true
            })
            .mockResolvedValueOnce({
                list: [{ id: '2', name: 'Card 2' } as any],
                more: false
            });

        // First page
        await store.fetchGlobalCards(true);
        expect(cardService.listAll).toHaveBeenCalledTimes(1);
        expect(store.globalCards).toHaveLength(1);
        expect(store.globalCards[0].id).toBe('1');
        expect(store.hasMoreGlobal).toBe(true);

        // Second page
        await store.fetchGlobalCards();
        expect(cardService.listAll).toHaveBeenCalledTimes(2);
        expect(store.globalCards).toHaveLength(2);
        expect(store.globalCards[1].id).toBe('2');
        expect(store.hasMoreGlobal).toBe(false);
    });

    it('should handle error during fetchGlobalCards', async () => {
        const store = useCardStore();
        vi.mocked(cardService.listAll).mockRejectedValue(new Error('API Error'));

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        await store.fetchGlobalCards();

        expect(store.isLoading).toBe(false);
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});

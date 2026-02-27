import { onMounted, onUnmounted, type Ref } from 'vue';

export interface UseInfiniteScrollOptions {
    threshold?: number;
    enabled?: boolean;
}

export function useInfiniteScroll(
    loader: Ref<HTMLElement | null>,
    callback: () => void,
    options: UseInfiniteScrollOptions = {}
) {
    const { threshold = 0.1, enabled = true } = options;

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && enabled) {
            callback();
        }
    }, { threshold });

    onMounted(() => {
        if (loader.value) {
            observer.observe(loader.value);
        }
    });

    onUnmounted(() => {
        observer.disconnect();
    });

    return {
        observer
    };
}

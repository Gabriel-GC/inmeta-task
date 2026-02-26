<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Toaster position="top-right" rich-colors close-button expand />
        <Navbar />
        <main class="flex-grow container mx-auto px-2 py-2 mt-4">
            <RouterView v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </RouterView>
        </main>
        <Footer />
        <LoadingSpinner v-if="authStore.isLoading" />
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

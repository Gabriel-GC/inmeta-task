<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { LayoutGrid, Wallet, LogOut, Menu, X, ArrowRightLeft } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const authStore = useAuthStore();
const router = useRouter();
const isMenuOpen = ref(false);

const handleLogout = () => {
    authStore.logout();
    router.push('/login');
};

const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;

const navTarget = ref(null);
onClickOutside(navTarget, () => {
    isMenuOpen.value = false;
});
</script>

<template>
    <nav ref="navTarget" class="bg-white border-b border-dark/5 sticky top-0 z-50">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center h-20">

                <router-link to="/" class="flex items-center gap-2">
                    <div
                        class="w-10 h-10 bg-primary rounded-2xl mx-auto flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-primary/10">
                        IM
                    </div>
                    <span class="text-xl font-extrabold tracking-tight">
                        Market<span class="text-primary text-2xl">.</span>TASK
                    </span>
                </router-link>

                <div class="hidden md:flex items-center gap-8">
                    <router-link to="/marketplace"
                        class="flex text-sm titems-center gap-2 font-semibold text-dark/60 hover:text-primary transition-colors"
                        active-class="text-primary !text-primary">
                        <LayoutGrid :size="20" /> Marketplace
                    </router-link>

                    <template v-if="authStore.isAuthenticated">
                        <router-link to="/my-proposals"
                            class="flex text-sm items-center gap-2 font-semibold text-dark/60 hover:text-primary transition-colors"
                            active-class="text-primary !text-primary">
                            <ArrowRightLeft :size="20" /> Minhas Propostas
                        </router-link>
                        <router-link to="/my-collection"
                            class="flex text-sm items-center gap-2 font-semibold text-dark/60 hover:text-primary transition-colors"
                            active-class="text-primary !text-primary">
                            <Wallet :size="20" /> Minha Coleção
                        </router-link>

                        <div class="h-8 w-[1px] bg-dark/10 mx-2"></div>

                        <div class="flex items-center gap-4">
                            <div class="flex flex-col items-end">
                                <span class="text-sm font-bold">{{ authStore.user?.name }}</span>
                            </div>
                            <button @click="handleLogout"
                                class="p-2.5 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                title="Sair">
                                <LogOut :size="20" />
                            </button>
                        </div>
                    </template>
                    <template v-else>
                        <router-link to="/login"
                            class="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                            Entrar
                        </router-link>
                    </template>
                </div>

                <button @click="toggleMenu" class="md:hidden p-2 text-dark">
                    <Menu v-if="!isMenuOpen" />
                    <X v-else />
                </button>
            </div>
        </div>

        <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-dark/5 p-4 space-y-4 shadow-xl">
            <router-link to="/marketplace"
                class="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 font-semibold text-dark/70"
                active-class="bg-primary/5 text-primary" @click="isMenuOpen = false">
                <LayoutGrid :size="20" /> Marketplace
            </router-link>

            <template v-if="authStore.isAuthenticated">
                <router-link to="/my-collection"
                    class="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 font-semibold text-dark/70"
                    active-class="bg-primary/5 text-primary" @click="isMenuOpen = false">
                    <Wallet :size="20" /> Minha Coleção
                </router-link>
                <router-link to="/my-proposals"
                    class="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 font-semibold text-dark/70"
                    active-class="bg-primary/5 text-primary" @click="isMenuOpen = false">
                    <ArrowRightLeft :size="20" /> Minhas Propostas
                </router-link>
                <div class="pt-4 border-t border-dark/5 flex justify-between items-center">
                    <span class="font-bold text-sm">{{ authStore.user?.name }}</span>
                    <button @click="handleLogout" class="flex items-center gap-2 text-red-500 font-bold text-sm">
                        <LogOut :size="16" /> Sair
                    </button>
                </div>
            </template>
            <template v-else>
                <div class="pt-4 border-t border-dark/5">
                    <router-link to="/login"
                        class="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white font-bold rounded-xl"
                        @click="isMenuOpen = false">
                        Entrar na Conta
                    </router-link>
                </div>
            </template>
        </div>
    </nav>
</template>

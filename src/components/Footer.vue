<script setup lang="ts">
import { LayoutGrid, Wallet, ArrowRightLeft, Github, Twitter, Instagram, Linkedin, GithubIcon, Code } from 'lucide-vue-next';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="bg-white border-t border-dark/5 pt-16 pb-8 mt-10">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <!-- Brand Section -->
                <div class="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                    <router-link to="/" class="flex items-center gap-2">
                        <div
                            class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl">
                            IM
                        </div>
                        <span class="text-xl font-extrabold tracking-tight">
                            Market<span class="text-primary text-2xl">.</span>TASK
                        </span>
                    </router-link>
                    <p class="text-dark/60 text-sm leading-relaxed">
                        A plataforma definitiva para troca e gerenciamento de ativos digitais. Segurança, transparência e facilidade em cada transação.<b>Confira os código:</b>
                    </p>
                    <div class="flex items-center justify-center md:justify-start gap-4">
                        <a target="_blank" href="https://www.linkedin.com/in/gabriel-gon%C3%A7alves-cunha-37347b305/pt/" class="p-2 rounded-lg bg-dark/5 text-dark/60 hover:bg-primary/10 hover:text-primary transition-all">
                            <Linkedin :size="20" />
                        </a>
                        <a target="_blank" href="https://github.com/Gabriel-GC" class="p-2 rounded-lg bg-dark/5 text-dark/60 hover:bg-primary/10 hover:text-primary transition-all">
                            <GithubIcon :size="20" />
                        </a>
                        <a target="_blank" href="https://github.com/Gabriel-GC/inmeta-task" class="p-2 rounded-lg bg-dark/5 text-dark/60 hover:bg-primary/10 hover:text-primary transition-all">
                            <Code :size="20" />
                        </a>
                    </div>
                </div>

                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 class="font-bold text-dark mb-6">Marketplace</h3>
                    <ul class="space-y-4 flex flex-col items-center md:items-start">
                        <li>
                            <router-link to="/marketplace" class="text-dark/60 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                                <LayoutGrid :size="16" /> Explorar Items
                            </router-link>
                        </li>
                        <template v-if="authStore.isAuthenticated">
                            <li>
                                <router-link to="/my-proposals" class="text-dark/60 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                                    <ArrowRightLeft :size="16" /> Minhas Propostas
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/my-collection" class="text-dark/60 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                                    <Wallet :size="16" /> Minha Coleção
                                </router-link>
                            </li>
                        </template>
                    </ul>
                </div>

                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 class="font-bold text-dark mb-6">Conta</h3>
                    <ul class="space-y-4 flex flex-col items-center md:items-start">
                        <template v-if="authStore.isAuthenticated">
                            <li>
                                <span class="text-dark/60 text-sm font-medium">Conectado como:</span>
                                <p class="text-dark font-bold text-sm">{{ authStore.user?.name }}</p>
                            </li>
                        </template>
                        <template v-else>
                            <li>
                                <router-link to="/login" class="text-dark/60 hover:text-primary transition-colors text-sm font-medium">
                                    Entrar
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/login" class="text-dark/60 hover:text-primary transition-colors text-sm font-medium">
                                    Criar Conta
                                </router-link>
                            </li>
                        </template>
                    </ul>
                </div>

                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 class="font-bold text-dark mb-6">Suporte</h3>
                    <ul class="space-y-1 flex flex-col items-center md:items-start">
                        <li>
                            <p class="text-dark/60 text-sm">Precisa de ajuda?</p>
                            <a href="mailto:suporte@suporte.com" class="text-primary font-bold hover:underline text-sm">
                                suporte@suporte.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="pt-8 border-t border-dark/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-dark/40 text-sm font-medium">
                    &copy; {{ currentYear }} InMeta. Todos os direitos reservados.
                </p>
                <div class="flex items-center gap-8">
                    <a href="#" class="text-dark/40 hover:text-dark/60 transition-colors text-sm font-medium">
                        Termos de Serviço
                    </a>
                    <a href="#" class="text-dark/40 hover:text-dark/60 transition-colors text-sm font-medium">
                        Política de Privacidade
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

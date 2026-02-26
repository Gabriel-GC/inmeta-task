<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import { LogIn } from 'lucide-vue-next';
import { loginSchema } from '@/types/schemas';
import { toast } from 'vue-sonner';

const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
    error.value = '';

    const validation = loginSchema.safeParse({ email: email.value, password: password.value });
    if (!validation.success) {
        error.value = validation.error.issues[0].message;
        return;
    }

    try {
        await authStore.login({ email: email.value, password: password.value });
        toast.success('Login realizado com sucesso.');
        router.push('/marketplace');
    } catch (err: any) {
        error.value = err.response?.data?.message || 'Falha ao entrar. Verifique suas credenciais.';
    }
};
</script>

<template>
    <div class="min-h-[80vh] flex items-center justify-center">
        <div class="w-full max-w-md glass-panel p-8 space-y-8 animate-fade-in">
            <div class="text-center space-y-2">
                <div
                    class="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center text-white font-black text-3xl shadow-lg ring-4 ring-primary/10">
                    IM
                </div>
                <h1 class="text-2xl font-extrabold text-dark pt-4">Bem-vindo!</h1>
                <p class="text-dark/40 font-semibold uppercase tracking-widest text-[10px]">InMeta task
                </p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-5 flex flex-col">
                <BaseInput id="email" label="E-mail" type="email" v-model="email" placeholder="seu@email.com" />
                <BaseInput id="password" label="Senha" type="password" v-model="password" placeholder="••••••••" />

                <div v-if="error"
                    class="bg-red-50 border border-red-100 p-3 rounded-xl text-red-500 text-xs font-bold animate-shake">
                    {{ error }}
                </div>

                <BaseButton type="submit" class="w-full" :loading="authStore.isLoading">
                    <LogIn v-if="!authStore.isLoading" :size="18" />
                    {{ authStore.isLoading ? 'Entrando...' : 'Acessar Marketplace' }}
                </BaseButton>
            </form>

            <div class="text-center pt-4">
                <p class="text-xs text-dark/60">
                    Não tem uma conta?
                    <router-link to="/register" class="text-primary font-bold hover:underline">
                        Crie sua conta agora
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

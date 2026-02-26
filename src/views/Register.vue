<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import { UserPlus } from 'lucide-vue-next';
import { registerSchema } from '@/types/schemas';
import { toast } from 'vue-sonner';

const authStore = useAuthStore();
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const handleRegister = async () => {
    error.value = '';

    const validation = registerSchema.safeParse({
        name: name.value,
        email: email.value,
        password: password.value
    });

    if (!validation.success) {
        error.value = validation.error.issues[0].message;
        return;
    }

    try {
        await authStore.register({
            name: name.value,
            email: email.value,
            password: password.value
        });

        if (authStore.isAuthenticated) {
            toast.success('Conta criada com sucesso! Bem-vindo ao Marketplace.');
            
            await router.replace('/marketplace');
        } else {
            router.push('/login');
            toast.success('Conta criada! Por favor, faça login para acessar.');
        }

    } catch (err: any) {
        error.value = err.response?.data?.message || 'Erro ao criar conta. Tente novamente.';
    }
};
</script>

<template>
    <div class="min-h-[80vh] flex items-center justify-center">
        <div class="w-full max-w-md glass-panel p-8 space-y-8 animate-fade-in">
            <div class="text-center space-y-2">
                <div
                    class="w-16 h-16 bg-secondary rounded-2xl mx-auto flex items-center justify-center text-white font-black text-3xl shadow-lg ring-4 ring-secondary/10">
                    IM
                </div>
                <h1 class="text-2xl font-extrabold text-dark pt-4">Criar sua Conta</h1>
                <p class="text-dark/40 font-semibold uppercase tracking-widest text-[10px]">Treine, Colecione e Troque
                </p>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-5 flex flex-col">
                <BaseInput id="name" label="Nome Completo" v-model="name" placeholder="Ex: Gabriel Cunha" />
                <BaseInput id="email" label="E-mail" type="email" v-model="email" placeholder="seu@email.com" />
                <BaseInput id="password" label="Senha" type="password" v-model="password" placeholder="••••••••" />

                <div v-if="error" class="bg-red-50 border border-red-100 p-3 rounded-xl text-red-500 text-xs font-bold">
                    {{ error }}
                </div>

                <BaseButton type="submit" variant="secondary" class="w-full" :loading="authStore.isLoading">
                    <UserPlus v-if="!authStore.isLoading" :size="18" />
                    {{ authStore.isLoading ? 'Criando Conta...' : 'Começar Coleção' }}
                </BaseButton>
            </form>

            <div class="text-center pt-4">
                <p class="text-xs text-dark/60">
                    Já possui conta?
                    <router-link to="/login" class="text-secondary font-bold hover:underline">
                        Faça login aqui
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<template>
    <div class="fixed inset-0 bg-white/60 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-4">
        <div class="relative w-16 h-16">
            <div class="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div class="text-center">
            <p class="text-dark font-extrabold text-lg animate-pulse">Carregando Mercado...</p>
            <p class="text-dark/60 text-sm max-w-[250px]">
                Nossa API pode levar até 30 segundos para "acordar" no primeiro carregamento. Obrigado pela paciência!
            </p>
        </div>
    </div>
</template>

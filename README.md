# InMeta Marketplace MVP

Este é um MVP de um Marketplace de Troca de Cartas (TCG) desenvolvido como teste técnico. O projeto utiliza tecnologias modernas de front-end para garantir performance, tipagem estrita e uma experiência de usuário fluida, com design inspirado na identidade visual da **InMeta**.

## 🚀 Tecnologias Utilizadas

- **Framework:** Vue 3 (Vite + Composition API + `<script setup>`)
- **Linguagem:** TypeScript (Interfaces e Tipagem Estrita)
- **Estado:** Pinia (Store modular com persistência)
- **Estilo:** Tailwind CSS (Arquitetura utilitária e branding InMeta)
- **API:** Axios (Interceptors para JWT e tratamento global de erros)
- **Ícones:** Lucide Vue Next
- **Testes:** Vitest + Vue Test Utils
- **Validação:** Zod (Esquemas de dados)

## 🛠️ Estrutura do Projeto

```text
src/
├── api/          # Serviços e instância Axios (Interceptors)
├── components/   # Componentes de UI (Botões, Cards, Modais) e Domínio
├── router/       # Configuração do Vue Router e Navigation Guards
├── store/        # Gerenciamento de estado global com Pinia
├── types/        # Definições de interfaces TypeScript globais
├── views/        # Páginas principais (Marketplace, Login, My Collection, etc.)
├── App.vue       # Componente raiz com Layout e Toast
└── main.ts       # Inicialização da App e Plugins
```

## ✨ Funcionalidades

1.  **Autenticação Completa:** Cadastro e Login com persistência de sessão via JWT e Pinia Persisted State.
2.  **Gestão de Coleção:** Adição de novas cartas ao inventário e visualização de cartas já possuídas.
3.  **Marketplace Global:** Listagem em tempo real de todas as trocas propostas pela comunidade.
4.  **Sistema de Trocas:** Fluxo guiado para criação de propostas (escolha de oferta e demanda).
5.  **Design "TCG Premium":** Interface inspirada em jogos de cartas modernos, com efeitos de profundidade, bordas suaves e paleta vibrante.
6.  **Resiliência:** Tratamento de erros de rede, 401 (Unauthorized) automático e feedback visual via `vue-sonner`.

## 🧠 Arquitetura de Estado (Pinia)

O projeto utiliza o Pinia para gerenciar o estado global de forma modular:
- **`authStore`**: Gerencia o usuário logado, token JWT e estado de autenticação. Os dados são persistidos no `localStorage`.
- **`cardsStore`**: Controla o inventário do usuário e as cartas disponíveis no sistema.
- **`tradesStore`**: Gerencia a lista global de propostas e o estado de criação de novas trocas.

## 📡 Integração com API

A comunicação é feita via Axios, centralizada em `src/api/client.ts`.
- **Base URL**: `https://cards-marketplace-api.onrender.com`
- **Interceptors**: Adiciona automaticamente o token Bearer em cada requisição e redireciona para o login caso o token expire.

## 🏁 Scripts Disponíveis

| Script | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build` | Compila o projeto para produção com verificação de tipos |
| `npm run preview` | Serve o build de produção localmente |
| `npm run test` | Executa a suíte de testes unitários e de integração (Vitest) |

## ⚙️ Como Rodar o Projeto

1.  Clone o repositório e acesse o diretório:
    ```bash
    cd inmeta-task
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse `http://localhost:5173` (ou a porta indicada no terminal).

---
Desenvolvido por GabrielGC para o desafio técnico InMeta.

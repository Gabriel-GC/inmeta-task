LINK DO PROJETO: https://marketplace-task.netlify.app/

# InMeta Marketplace MVP

Este é um MVP de um Marketplace de Troca de Cartas (TCG) desenvolvido como teste técnico. O projeto utiliza tecnologias modernas de front-end para garantir performance, tipagem estrita e uma experiência de usuário fluida, com design inspirado na identidade visual da **InMeta**.


## Tecnologias Utilizadas

- **Framework:** Vue 3 (Vite + Composition API + `<script setup>`)
- **Linguagem:** TypeScript (Interfaces e Tipagem Estrita)
- **Estado:** Pinia (Store modular com persistência)
- **Styling:** Tailwind CSS (Arquitetura utilitária e branding InMeta)
- **UI & Animações:** Splide (Carousel), Lucide Vue Next (Ícones)
- **Utilidades:** VueUse (`useInfiniteScroll`), Axios (API), Zod (Validação)
- **Testes:** Vitest + Vue Test Utils


## Estrutura do Projeto

```text
src/
├── api/          # Serviços e instância Axios (Interceptors)
├── components/   # Componentes de UI e Domínio (Modais, Cards, Form)
├── composables/  # Lógica reutilizável (Infinite Scroll)
├── router/       # Configuração do Vue Router
├── store/        # Gerenciamento de estado global com Pinia
├── types/        # Definições de interfaces TypeScript
├── views/        # Páginas principais do Marketplace
├── App.vue       # Componente raiz
└── main.ts       # Inicialização da App
```

## Especificações Funcionais

| Requisito | Status | Observações |
| :--- | :---: | :--- |
| **Registrar Usuário** | ✅ | Validação Zod e feedback via Toast. |
| **Login de Usuário** | ✅ | Autenticação JWT com persistência. |
| **Adicionar Cartas** | ✅ | Multi-seleção e vínculo com a coleção do usuário. |
| **Biblioteca Global** | ✅ | Navegação via **Infinite Scroll** e busca otimizada. |
| **Criar Solicitação** | ✅ | Fluxo intuitivo de 2 passos (Oferta -> Demanda). |
| **Escolher Ofertas** | ✅ | Seleção múltipla de cartas da própria coleção. |
| **Escolher Demandas** | ✅ | Busca global em todo o catálogo da API. |
| **Gestão de Trocas** | ✅ | Visualização e exclusão de propostas criadas. |
| **Marketplace** | ✅ | Feed público de trocas com curadoria de banners. |


## Funcionalidades de Destaque

1.  **Banner de Promoções**: Carousel interativo na home para anúncios e destaques da plataforma (Splide).
2.  **Infinite Scroll**: Carregamento fluido de cartas na biblioteca global, evitando paginação manual exaustiva.
3.  **Seleção Múltipla**: UI otimizada para adicionar ou oferecer múltiplas cartas simultaneamente com feedback visual em tempo real.
4.  **Design "TCG Premium"**: Interface moderna com efeito blur (glassmorphism), paleta de cores harmoniosa e micro-animações.
5.  **Resiliência & UX**: Skeletons de carregamento inteligentes, tratamento de erros global e persistência de sessão.

### Extras Técnicos

1.  **Workaround de Contagem**: Sistema de sincronização inteligente para exibir o total de trocas disponíveis, contornando limitações da API.
2.  **Performance**: Uso de `debounce` nas buscas e otimização de renderização com componentes funcionais.
3.  **Deploy Contínuo**: Disponível publicamente via Netlify.
4.  **Qualidade de Código**: Suíte de testes unitários com Vitest garantindo a estabilidade das stores e serviços.


## Arquitetura de Estado (Pinia)

O projeto utiliza o Pinia para gerenciar o estado global de forma modular:
- **`authStore`**: Gerencia o usuário logado, token JWT e estado de autenticação. Os dados são persistidos no `localStorage`.
- **`cardsStore`**: Controla o inventário do usuário e as cartas disponíveis no sistema.
- **`tradesStore`**: Gerencia a lista global de propostas e o estado de criação de novas trocas.


## Integração com API

A comunicação é feita via Axios, centralizada em `src/api/client.ts`.
- **Base URL**: `https://cards-marketplace-api.onrender.com`
- **Interceptors**: Adiciona automaticamente o token Bearer em cada requisição e redireciona para o login caso o token expire.


## Scripts Disponíveis

| Script | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build` | Compila o projeto para produção com verificação de tipos |
| `npm run preview` | Serve o build de produção localmente |
| `npm run test` | Executa a suíte de testes unitários e de integração (Vitest) |


## Como Rodar o Projeto

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

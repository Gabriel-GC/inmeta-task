declare module '@splidejs/vue-splide' {
    import { DefineComponent } from 'vue';
    const Splide: DefineComponent<{}, {}, any>;
    const SplideSlide: DefineComponent<{}, {}, any>;
    const VueSplide: {
        install: (app: any) => void;
    };
    export { Splide, SplideSlide, VueSplide };
    export default VueSplide;
}

declare module '@splidejs/vue-splide/css' {
    const content: any;
    export default content;
}


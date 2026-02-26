import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: "smooth" };
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
      meta: { guest: true },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/Register.vue"),
      meta: { guest: true },
    },
    {
      path: "/marketplace",
      name: "Marketplace",
      component: () => import("@/views/Marketplace.vue"),
    },
    {
      path: "/my-collection",
      name: "MyCollection",
      component: () => import("@/views/MyCollection.vue"),
      meta: { auth: true },
    },
    {
      path: "/my-proposals",
      name: "MyProposals",
      component: () => import("@/views/MyProposals.vue"),
      meta: { auth: true },
    },
    {
      path: "/",
      redirect: "/marketplace",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.token && !authStore.user) {
    await authStore.initialize();
  }

  if (to.meta.auth && !authStore.isAuthenticated) {
    next("/login");
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;

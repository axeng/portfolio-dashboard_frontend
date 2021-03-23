import { createRouter, createWebHistory } from "vue-router";

import store from "@/store";

import Unauthorized from "@/views/Unauthorized.vue";
import Home from "@/views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/unauthorized",
        name: "Unauthorized",
        component: Unauthorized,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "Unknown",
        redirect: {
            name: "Home"
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const authenticated = await store.dispatch("auth/initKeycloak");

        if (authenticated) {
            next();
        } else {
            next("/unauthorized");
        }
    } else {
        next();
    }
});

export default router;

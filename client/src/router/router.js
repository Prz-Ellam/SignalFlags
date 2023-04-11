import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

import Home from '../views/Home.vue';
import Layout from '../components/Layout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (to.path === '/') {
        to.matched[0].components.default = token ? Layout : Home;
        next(vm => {
            // asegurarse de que el componente actualizado se muestre
            vm.$forceUpdate();
        });
    }

    if (requiresAuth && !token) {
        next('/');
    }
    else if (!requiresAuth && token) {
        next('/');
    }

    next();
});

export default router;
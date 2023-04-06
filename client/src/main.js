import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router/router';

import './assets/main.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

createApp(App).use(router).mount('#app');

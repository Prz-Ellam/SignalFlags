import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router/router';
import io from 'socket.io-client';

import './assets/main.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

const token = localStorage.getItem('token');
if (token) {
    // 192.168.0.180
    const socket = io('/', { 
        auth: {
            token
        },
        transports: [ 'websocket' ]
    });
    window.socket = socket;
}

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

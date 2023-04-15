import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import axios from 'axios';
import router from './router/router';
import io from 'socket.io-client';

import './assets/main.scss';

//import 'bootstrap-vue/dist/bootstrap-vue.min.css';

import 'bootstrap';

const token = localStorage.getItem('token');
if (token) {
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

const store = createStore({
    strict: true,
    state: {
      // Estado de tu aplicación
      token: null,
      user: null,
      socket: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        setUser({ commit }, user) {
            commit('setUser', user);
        }
    },
    getters: {
        getToken() {
            return token;
        }
      // Getters para obtener datos del estado
    }
});
  

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');

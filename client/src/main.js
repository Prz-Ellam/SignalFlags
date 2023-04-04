import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';

import './assets/main.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

createApp(App).use(router).mount('#app');

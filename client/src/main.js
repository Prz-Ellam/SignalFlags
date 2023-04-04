import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';

import './assets/main.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
/*
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives 
});
*/

createApp(App).use(router).mount('#app');

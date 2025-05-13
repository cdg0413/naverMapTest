import { createApp } from 'vue';
import '@/styles/style.css';
import App from './App.vue';
import router from './router';
import store from './store';
import mitt from 'mitt';

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';

const app = createApp(App);

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

app.use(router).use(store).mount('#app');
app.use(PrimeVue, {
    theme: {
        options: {
            darkModeSelector: false || 'none',
        },
    },
});

import { createApp } from 'vue';
import '@/styles/index.scss';
import { registerDirectives } from '@/directive';
import App from './App.vue';

const app = createApp(App);
registerDirectives(app);

app.mount('#app');

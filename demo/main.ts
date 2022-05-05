import { createApp } from 'vue';
import App from './App';

const app = createApp(App);

app.config.warnHandler = () => {};

app.mount('#app');

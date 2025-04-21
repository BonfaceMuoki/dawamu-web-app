import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes'




import '@fortawesome/fontawesome-free/css/all.min.css'


const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');

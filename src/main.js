import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';

const app = createApp(App);

import router from "./routes/index"
app.use(router);

import vueCookies from "vue-cookies";
app.use(vueCookies);

const pinia = createPinia();
app.use(pinia);

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import '@fortawesome/fontawesome-free/css/all.css'; // Font Awesome 추가

// Use plugin with optional defaults
app.use(VCalendar, {})

app.mount('#app')

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App);

import router from "./routes/index"
app.use(router);

import vueCookies from "vue-cookies";
app.use(vueCookies);

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

// Use plugin with optional defaults
app.use(VCalendar, {})

app.mount('#app')

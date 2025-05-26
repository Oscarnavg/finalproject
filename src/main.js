import { createApp } from 'vue'
import App from './App.vue'

import './style.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js' 

import { createPinia } from 'pinia'

import router from './router/index.js';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')

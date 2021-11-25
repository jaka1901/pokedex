import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue3-cookies'
import Notifications from '@kyvg/vue3-notification'

createApp(App)
    .use(store)
    .use(router)
    .use(VueCookies)
    .use(Notifications)
    .use(VueAxios, axios)
    .mount('#app')
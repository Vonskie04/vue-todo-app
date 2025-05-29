import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

// Toast Configuration
const toastOptions = {
    position: "top-right",
    timeout: 1500,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true
};

app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')

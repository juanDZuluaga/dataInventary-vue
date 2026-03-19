import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue' 
import './assets/main.css' // esta es la decuacion con el tailwind
import router from './router'

const app = createApp(App)

app.use(createPinia())  // 👈 primero Pinia
app.use(router)         // luego el router

app.mount('#app')
// createApp(App).use(router).mount('#app')
// createApp(App).mount('#app')

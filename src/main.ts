import { createApp } from 'vue'
import './style.css'
import App from './App.vue' 
import './assets/main.css' // esta es la decuacion con el tailwind
import { router } from './router'

createApp(App)
  .use(router)
  .mount('#app')

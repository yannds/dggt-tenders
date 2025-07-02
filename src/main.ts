import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
// ... (autres imports)
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
// createApp(App).mount('#app') // supprimé car doublon et casse le router

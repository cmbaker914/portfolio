import { createApp } from 'vue'
import './styles/global.css'
import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'
import { initTheme } from './lib/theme'

initTheme()

createApp(App).use(router).directive('reveal', reveal).mount('#app')

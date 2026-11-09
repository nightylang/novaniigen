import './assets/css/main.css'

import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App)
const head = createHead()
const router = createRouter({
  routes: [],
  history: createWebHistory()
})

app.use(router)
app.use(head)
app.use(ui)

app.mount('#app')

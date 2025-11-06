import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Plans from './views/Plans.vue'
import Contact from './views/Contact.vue'
import Auth from './views/Auth.vue'
import './style.css'

const routes = [
  { path: '/', component: Home },
  { path: '/plans', component: Plans },
  { path: '/contact', component: Contact },
  { path: '/auth', component: Auth }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top on route change
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

createApp(App).use(router).mount('#app')

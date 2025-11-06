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
    // Always scroll to top - force it
    return { top: 0, left: 0, behavior: 'instant' }
  }
})

// Prevent browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// Force scroll to top on page load
window.addEventListener('load', () => {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
})

createApp(App).use(router).mount('#app')

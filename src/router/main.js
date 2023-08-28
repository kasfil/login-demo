import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/pages/Dashboard.vue'
import Line from '@/pages/authPage/Line.vue'
import Google from '@/pages/authPage/Google.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/line',
      name: 'LineAuth',
      component: Line
    },
    {
      path: '/google',
      name: 'GoogleAuth',
      component: Google
    }
  ]
})

export default router

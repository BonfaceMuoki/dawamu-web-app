// src/routes/index.js or similar

import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children:[{
      path:"login",
      name:"Login",
      component:Login
    }] 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

// src/routes/index.js or similar

import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import { authStore } from '../store/authStore'
import Classes from '../pages/Classes.vue'
import NoticeBoard from '../pages/NoticeBoard.vue'
import Exams from '../pages/Exams.vue'
import ClassDetails from '../pages/ClassDetails.vue'
import ExamDetails from '../components/ExamDetails.vue'
import ExamSettings from '../components/ExamSettings.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [      
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta:{isProtected:true}
      },
      {
        path:"/classes",
        component:Classes,
        meta:{isProtected:true}
      },
      {
        path:"/class-details/:id",
        component:ClassDetails,
        meta:{isProtected:true}
      },
      {
        path:"/exam-details/:classId/:examId",
        component:ExamDetails,
        meta:{isProtected:true}
      },      
      {
        path:"/notice-board",
        component:NoticeBoard,
        meta:{isProtected:true}
      },
      {
        path:"/set-exam",
        component:ExamSettings,
        meta:{isProtected:true}
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
router.beforeEach((to, from, next) => {
  const auth = authStore();
  if (to.meta.isProtected && !auth.token) {
    next('/auth/login');
  } 
  else if (to.path === '/auth/login' && auth.token) {
    next('/dashboard');
  } 
  else {
    next();
  }
});


export default router

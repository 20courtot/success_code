import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/questionnaires',
    name: 'questionnaires',
    component: () => import('../views/questionnaires.vue')
  },
  {
    path: '/questionnaireStart',
    name: 'questionnaireStart',
    component: () => import('../views/questionnaireStart.vue')
  },
  {
    path: '/correcteurHome',
    name: 'correcteurHome',
    component: () => import('../views/correcteurHome.vue')
  },
  {
    path: '/create_questionnaire',
    name: 'create_questionnaire',
    component: () => import('../views/create_questionnaire.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/manage_questionnaire',
    name: 'manage_questionnaire',
    component: () => import('../views/manage_questionnaire.vue')
  },
  {
    path: '/correct_questionnaire',
    name: 'correct_questionnaire',
    component: () => import('../views/correct_questionnaire.vue')
  },
  {
    path: '/collabHome',
    name: 'collabHome',
    component: () => import('../views/collabHome.vue')
  },
  {
    path: '/collabResult',
    name: 'collabResult',
    component: () => import('../views/collabResult.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/questionnaireEnd',
    name: 'questionnaireEnd',
    component: () => import('../views/questionnaireEnd.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import AuthModule from '@/store/modules/auth-module'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'

import Home from '@/views/Home.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'

let auth: AuthModule = getModule(AuthModule, store)

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      guets: true,
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, _from, _savedPosition) {
    return { x: 0, y: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth.isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!auth.isLoggedIn) {
      next()
    } else {
      next('/users')
    }
  } else {
    next()
  }
})

export default router

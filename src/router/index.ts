import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import AuthModule from '@/store/modules/auth-module'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'

let auth: AuthModule = getModule(AuthModule, store)

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
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
]

const router = new VueRouter({
  routes,
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

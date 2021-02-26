import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from './modules/auth-module'
import UserModule from './modules/user-module'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    auth: AuthModule,
    user: UserModule,
  },
})

export default store

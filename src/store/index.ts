import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from './modules/auth-module'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    auth: AuthModule,
  },
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from './modules/auth-module'
import UserModule from './modules/user-module'
import AccountModule from './modules/account-module'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    auth: AuthModule,
    user: UserModule,
    account: AccountModule,
  },
})

export default store

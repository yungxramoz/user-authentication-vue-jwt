<template>
  <div class="LayoutAuthorized">
    <yr-app-bar>
      <h1>{{ fullname }}</h1>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <yr-icon-btn v-bind="attrs" v-on="on" @click="logout">mdi-logout</yr-icon-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </yr-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-footer app class="pa-0">
      <v-bottom-navigation v-model="value" :background-color="color" dark shift>
        <v-btn to="/">
          <span>Users</span>
          <v-icon>mdi-account-group</v-icon>
        </v-btn>
        <v-btn to="about">
          <span>Profile</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

import AuthModule from '@/store/modules/auth-module'

import { YrAppBar, YrIconBtn } from '@/components'

@Component({
  components: {
    YrAppBar,
    YrIconBtn,
  },
})
export default class LayoutDefault extends Vue {
  private auth: AuthModule

  constructor() {
    super()
    this.auth = getModule(AuthModule, this.$store)
  }

  get fullname() {
    return this.auth.fullname
  }

  logout() {
    this.auth.logout()
  }
}
</script>

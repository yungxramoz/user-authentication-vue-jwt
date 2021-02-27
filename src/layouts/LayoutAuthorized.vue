<template>
  <div class="LayoutAuthorized">
    <yr-app-bar>
      <router-link to="/" class="mr-2">
        <v-img
          contain
          max-height="50"
          max-width="55"
          src="../assets/sm-header.png"
          lazy-src="../assets/sm-header.png"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row> </template
        ></v-img>
      </router-link>
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
      <v-bottom-navigation shift color="secondary darken-1">
        <v-btn to="users">
          <span>Users</span>
          <v-icon>mdi-account-group</v-icon>
        </v-btn>
        <v-btn to="profile">
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

  logout() {
    this.auth.logout()
    this.$router.push('/')
  }
}
</script>

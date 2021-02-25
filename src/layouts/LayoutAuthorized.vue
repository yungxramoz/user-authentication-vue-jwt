<template>
  <div class="LayoutAuthorized">
    <yr-app-bar>
      <h1>Loggedin Name</h1>
      <v-spacer></v-spacer>
      <yr-icon-btn>mdi-logout</yr-icon-btn>
    </yr-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-footer app>
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
import { YrAppBar, YrIconBtn } from '@/components'

@Component({
  components: {
    YrAppBar,
    YrIconBtn,
  },
})
export default class LayoutDefault extends Vue {}
</script>

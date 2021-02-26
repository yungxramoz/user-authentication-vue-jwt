<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

import AuthModule from '@/store/modules/auth-module'

import LayoutDefault from '@/layouts/LayoutDefault.vue'
import LayoutAuthorized from '@/layouts/LayoutAuthorized.vue'

@Component({
  components: {
    LayoutDefault,
    LayoutAuthorized,
  },
})
export default class App extends Vue {
  private auth: AuthModule

  constructor() {
    super()
    this.auth = getModule(AuthModule, this.$store)
  }

  get layout() {
    return this.auth.isLoggedIn ? 'LayoutAuthorized' : 'LayoutDefault'
  }
}
</script>

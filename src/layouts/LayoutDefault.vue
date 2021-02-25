<template>
  <div class="LayoutDefault">
    <yr-app-bar>
      <h1>Session Master</h1>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <yr-icon-btn v-bind="attrs" v-on="on" to="/login">mdi-login</yr-icon-btn>
        </template>
        <span>Login</span>
      </v-tooltip>
    </yr-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-footer app>
      <v-spacer></v-spacer>
      <v-subheader> &copy; {{ new Date().getFullYear() }} Sandro Gerber </v-subheader>
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

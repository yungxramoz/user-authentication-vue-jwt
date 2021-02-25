<template>
  <div class="LayoutDefault">
    <yr-app-bar>
      <h1>Session Master</h1>
      <v-spacer></v-spacer>
      <yr-icon-btn>mdi-login</yr-icon-btn>
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

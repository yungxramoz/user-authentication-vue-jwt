<template>
  <v-app dark>
    <component :is="component">
      <router-view />
      <v-switch label="layout" v-model="switchLayout"></v-switch>
    </component>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import LayoutAuthorized from '@/layouts/LayoutAuthorized.vue'

@Component({
  components: {
    LayoutDefault,
    LayoutAuthorized,
  },
})
export default class App extends Vue {
  switchLayout: boolean = false
  get component() {
    return this.switchLayout ? 'LayoutDefault' : 'LayoutAuthorized'
  }
}
</script>

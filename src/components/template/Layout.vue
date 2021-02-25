<template>
  <component :is="component">
    <slot />
  </component>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutDefault from '@/components/template/LayoutDefault.vue'
import LayoutAuthorized from '@/components/template/LayoutAuthorized.vue'

@Component({
  components: {
    LayoutDefault,
    LayoutAuthorized,
  },
})
export default class Layout extends Vue {
  switchLayout: boolean = false
  get component() {
    return this.switchLayout ? 'LayoutDefault' : 'LayoutAuthorized'
  }
}
</script>

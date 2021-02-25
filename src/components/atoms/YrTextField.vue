<script lang="ts">
import { VTextField } from 'vuetify/lib'

import { Component, Prop } from 'vue-property-decorator'

@Component
export default class YrTextField extends VTextField {
  @Prop({ default: true }) public filled!: boolean | string
  @Prop({ default: 'secondary' }) public color!: string
}
</script>

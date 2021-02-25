<template>
  <yr-form title="Login">
    <template #form>
      <v-form lazy-validation v-model="form.valid">
        <yr-text-field
          v-model="form.fields.username"
          label="Username"
          prepend-icon="mdi-account"
          required
        ></yr-text-field>
        <yr-password-field
          v-model="form.fields.password"
          label="Password"
          required
          @keyup.enter="login"
        ></yr-password-field>
        <div class="text-center">
          <yr-btn width="180px" @click="login">Login</yr-btn>
        </div>
      </v-form>
    </template>

    <template #footer>
      <v-spacer></v-spacer>
      <span class="caption"
        >Don't have an account yet? <router-link to="/signup">Sign up here</router-link>.
      </span>
      <v-spacer></v-spacer>
    </template>
  </yr-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FormDefinition from '@/models/form-definition'
import AuthenticateModel from '@/models/data/AuthenticateModel'

import { YrBtn, YrTextField, YrPasswordField, YrForm } from '@/components'

interface Form extends FormDefinition {
  valid: false
  fields: AuthenticateModel
}

@Component({
  components: {
    YrBtn,
    YrTextField,
    YrPasswordField,
    YrForm,
  },
})
export default class Login extends Vue {
  private form: Form = {
    valid: false,
    fields: {
      username: '',
      password: '',
    } as AuthenticateModel,
  }

  login() {
    if (this.form.valid) {
      console.log(`Login with Username: ${this.form.fields.username} ${this.form.fields.password}`)
    }
  }
}
</script>

<template>
  <yr-form title="Login">
    <template #form>
      <v-form ref="loginForm" v-model="form.valid" lazy-validation>
        <yr-text-field
          v-model="form.fields.username"
          label="Username"
          prepend-icon="mdi-account"
          required
          :rules="form.rules.username"
          :disabled="loading"
        ></yr-text-field>
        <yr-password-field
          v-model="form.fields.password"
          label="Password"
          required
          :rules="form.rules.password"
          :disabled="loading"
          @keyup.enter="login"
        ></yr-password-field>
        <div class="text-center">
          <yr-btn width="180px" @click="login" :loading="loading" :disabled="loading">Login</yr-btn>
        </div>
      </v-form>
    </template>

    <template #footer>
      <v-spacer></v-spacer>
      <span class="caption"
        >Don't have an account yet? <router-link to="/signup">Sign up here</router-link>.
      </span>
      <v-spacer></v-spacer>

      <v-bottom-sheet v-model="hasMessage" hide-overlay
        ><v-alert class="ma-0 pa-7" border="top" type="error" prominent>
          {{ message }}
        </v-alert></v-bottom-sheet
      >
    </template>
  </yr-form>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

import AuthModule from '@/store/modules/auth-module'

import { VForm } from '@/models/types'
import FormDefinition from '@/models/form-definition'
import AuthenticateModel from '@/models/data/AuthenticateModel'

import { YrBtn, YrTextField, YrPasswordField, YrForm } from '@/components'
import { InputValidationRule } from 'vuetify'
import { requiredRule } from '@/helpers/form-rules'

interface Form extends FormDefinition {
  valid: false
  fields: AuthenticateModel
  rules?: {
    username: InputValidationRule[]
    password: InputValidationRule[]
  }
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
  @Ref('loginForm') readonly loginForm!: VForm

  private form: Form = {
    valid: false,
    fields: {
      username: '',
      password: '',
    } as AuthenticateModel,
    rules: {
      username: [requiredRule()],
      password: [requiredRule()],
    },
  }
  private loading: boolean = false
  private message?: string
  private hasMessage?: boolean
  private auth: AuthModule

  constructor() {
    super()
    this.auth = getModule(AuthModule, this.$store)
  }

  async login() {
    let hasError = false
    this.loading = true

    if (this.loginForm.validate()) {
      await this.auth.login(this.form.fields).then(
        () => {
          this.$router.push('/')
        },
        error => {
          this.message = error
          hasError = true
        }
      )
    }
    this.hasMessage = hasError
    this.loading = false
  }
}
</script>

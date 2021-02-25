<template>
  <yr-form title="Create new Account">
    <template #form>
      <v-form lazy-validation v-model="form.valid">
        <yr-text-field
          v-model="form.fields.firstname"
          name="firsname"
          label="Firstname"
          id="firstname"
          counter="50"
          hint="*required"
          required
          :rules="form.rules.lastname"
        ></yr-text-field>
        <yr-text-field
          v-model="form.fields.lastname"
          name="lastname"
          label="Lastname"
          id="lastname"
          counter="50"
          hint="*required"
          required
          :rules="form.rules.lastname"
        ></yr-text-field>
        <yr-text-field
          v-model="form.fields.username"
          name="username"
          label="Username"
          id="username"
          counter="20"
          hint="*required"
          required
          :rules="form.rules.username"
        ></yr-text-field>
        <yr-password-field
          v-model="form.fields.password"
          name="password"
          label="Password"
          id="password"
          no-prepend-icon="true"
          :rules="form.rules.password"
        >
        </yr-password-field>
        <yr-password-field
          v-model="form.fields.confirmPassword"
          name="confirm-password"
          label="Confirm Password"
          id="confirm-password"
          no-prepend-icon="true"
          :rules="form.rules.confirmPassword"
        >
        </yr-password-field>
        <div class="text-center">
          <yr-btn type="submit" width="180px" :disabled="!form.valid">
            Sign up
          </yr-btn>
        </div>
      </v-form>
    </template>

    <template #footer>
      <v-spacer></v-spacer>
      <span class="caption"
        >Already have an account? <router-link to="/login">Login here</router-link>.
      </span>
      <v-spacer></v-spacer>
    </template>
  </yr-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import RegistrationModel from '@/models/data/RegistrationModel'
import FormDefinition from '@/models/form-definition'
import { maxCharRule, minCharRule, passwordRule, requiredRule } from '@/helpers/form-rules'

import { YrBtn, YrTextField, YrPasswordField, YrForm } from '@/components'

interface Form extends FormDefinition {
  valid: false
  fields: {
    firstname: string
    lastname: string
    username: string
    password: string
    confirmPassword: string
  }
  rules?: {
    firstname: ((message?: string) => {})[]
    lastname: ((message?: string) => {})[]
    username: ((message?: string) => {})[]
    password: ((message?: string) => {})[]
    confirmPassword: ((message?: string) => {})[]
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
export default class Registration extends Vue {
  form: Form = {
    valid: false,
    fields: {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  }

  beforeMount() {
    this.form.rules = {
      firstname: [requiredRule(), maxCharRule(50)],
      lastname: [requiredRule(), maxCharRule(50)],
      username: [requiredRule(), maxCharRule(20)],
      password: [requiredRule(), minCharRule(8), passwordRule()],
      confirmPassword: [this.passwordConfirmCustRule],
    }
  }

  // confirm password rule has to be a computed prop
  get passwordConfirmCustRule() {
    return () =>
      this.form.fields.password === this.form.fields.confirmPassword || 'Password must match'
  }
}
</script>

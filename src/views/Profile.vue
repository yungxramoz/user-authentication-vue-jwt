<template>
  <yr-form title="Profile">
    <template #form>
      <v-form lazy-validation v-model="form.valid">
        <yr-text-field
          v-model="form.fields.firstname"
          label="Firstname"
          counter="50"
          hint="*required"
          required
          :rules="form.rules.lastname"
        ></yr-text-field>
        <yr-text-field
          v-model="form.fields.lastname"
          label="Lastname"
          counter="50"
          hint="*required"
          required
          :rules="form.rules.lastname"
        ></yr-text-field>
        <yr-text-field
          v-model="form.fields.username"
          label="Username"
          counter="20"
          hint="*required"
          required
          :rules="form.rules.username"
        ></yr-text-field>
        <v-row>
          <v-col class="text-right">
            <yr-btn color="error" class="mr-4"> Delete Profile</yr-btn>
            <yr-btn :disabled="!updateEnabled || loading" @click="updateUser" :loading="loading">
              Update
            </yr-btn>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </yr-form>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { InputValidationRule } from 'vuetify'

import AuthModule from '@/store/modules/auth-module'
import AccountModule from '@/store/modules/account-module'

import { maxCharRule, minCharRule, passwordRule, requiredRule } from '@/helpers/form-rules'
import { cloneSource } from '@/helpers/clone'

import { VForm } from '@/models/types'
import UpdateUserModel from '@/models/data/UpdateUserModel'
import UserModel from '@/models/data/UserModel'
import FormDefinition from '@/models/form-definition'

import { YrBtn, YrTextField, YrPasswordField, YrForm } from '@/components'
import UserModule from '@/store/modules/user-module'

interface Form extends FormDefinition {
  valid: false
  fields: UpdateUserModel
  rules?: {
    firstname: InputValidationRule[]
    lastname: InputValidationRule[]
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
export default class Registration extends Vue {
  @Ref('profileForm') readonly profileForm!: VForm

  private form: Form = {
    valid: false,
    fields: {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
    },
  }
  private storedProfile?: UserModel
  private loading: boolean = false
  private message?: string = ''
  private messageType?: string = 'info'
  private auth: AuthModule = getModule(AuthModule, this.$store)
  private account: AccountModule = getModule(AccountModule, this.$store)

  created() {
    this.account.fetchUser(this.auth.userId)
    this.form.rules = {
      firstname: [requiredRule(), maxCharRule(50)],
      lastname: [requiredRule(), maxCharRule(50)],
      username: [requiredRule(), maxCharRule(20)],
      password: [requiredRule(), minCharRule(8), passwordRule()],
    }
  }

  get profileData() {
    return this.account.currentUser as UserModel
  }

  get updateEnabled(): boolean {
    return (
      (this.form.fields.username != this.account.currentUser.username ||
        this.form.fields.firstname != this.account.currentUser.firstname ||
        this.form.fields.lastname != this.account.currentUser.lastname) &&
      this.form.valid
    )
  }

  async update() {
    this.loading = true

    // if (this.profileForm.validate() && this.updateEnabled) {
    //   await this.auth.update(this.form.fields).then(
    //     () => {
    //       this.$router.push('/')
    //     },
    //     error => {
    //       this.message = error
    //       this.messageType = 'error'
    //     }
    //   )
    // }
    this.loading = false
  }
}
</script>

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
            <v-dialog v-model="deleteDialog" max-width="500px" :persistent="deleteLoading">
              <template v-slot:activator="{ on, attrs }">
                <yr-btn color="error" class="mr-4" v-bind="attrs" v-on="on">
                  Delete Profile
                </yr-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  Delete Action
                </v-card-title>
                <v-card-text>
                  Are you sure you want to delete Your Profile?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <yr-btn text :disabled="deleteLoading" @click="deleteDialog = false">
                    Cancel
                  </yr-btn>
                  <yr-btn
                    color="error"
                    :disabled="deleteLoading"
                    :loading="deleteLoading"
                    text
                    @click="deleteAct"
                  >
                    Delete
                  </yr-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <yr-btn :disabled="!updateEnabled" @click="update" :updateLoading="updateLoading">
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
  private updateLoading: boolean = false
  private deleteLoading: boolean = false
  private deleteDialog: boolean = false
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
      this.form.valid &&
      !this.updateLoading
    )
  }

  async update() {
    this.updateLoading = true

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
    this.updateLoading = false
  }

  async deleteAct() {
    this.deleteLoading = true
    await this.account.deleteUser(this.auth.userId).then(
      () => {
        this.auth.logout()
        this.$router.push('/')
      },
      error => {
        this.message = error
        this.messageType = 'error'
      }
    )

    this.deleteLoading = false
  }
}
</script>

<template>
  <v-container px-6 py-3>
    <div class="text-center mb-5">
      <h1>Users</h1>
    </div>
    <v-data-table
      :headers="headers"
      :items="allUsers"
      :search="search"
      :item-key="username"
    ></v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

import UserModule from '@/store/modules/user-module'

import { UserModel } from '@/models/data'
import { DataTableHeader } from 'vuetify'

@Component
export default class Login extends Vue {
  private users: UserModule = getModule(UserModule, this.$store)
  private search = ''
  private headers: DataTableHeader[] = [
    {
      text: 'Firstname',
      align: 'start',
      filterable: true,
      sortable: true,
      value: 'firstname',
    },
    {
      text: 'Lastname',
      align: 'start',
      filterable: true,
      sortable: true,
      value: 'lastname',
    },
  ]

  mounted() {
    this.users.fetchUsers()
  }

  get allUsers(): UserModel[] {
    return this.users.all
  }
}
</script>

<template>
  <v-container>
    <h1>Users</h1>
    <ul>
      <li v-for="user in allUsers" :key="user.userId">
        {{ user.username }}: {{ user.firstname }} {{ user.lastname }}
      </li>
    </ul>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

import UserModule from '@/store/modules/user-module'

import UserModel from '@/models/data/UserModel'

@Component
export default class Login extends Vue {
  private users: UserModule = getModule(UserModule, this.$store)

  mounted() {
    this.users.fetchUsers()
  }

  get allUsers(): UserModel[] {
    return this.users.all
  }
}
</script>

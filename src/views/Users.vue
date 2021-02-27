<template>
  <v-container pa-6>
    <div class="text-center mb-5">
      <h1>Users</h1>
    </div>
    <v-row dense>
      <v-col v-for="user in allUsers" :key="user.userId" cols="12" class="mb-1">
        <v-card color="info" elevation="3">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">{{ user.firstname }} {{ user.lastname }}</v-card-title>

              <v-card-subtitle>Username: {{ user.username }}</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
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

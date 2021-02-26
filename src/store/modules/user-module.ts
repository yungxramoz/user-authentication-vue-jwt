import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

import UserService from '@/services/user-service'

import UserModel from '@/models/data/UserModel'

@Module({ namespaced: true, name: 'user' })
class UserModule extends VuexModule {
  public users: UserModel[] | null = null

  @Mutation
  public fetchUsersSuccess(users: UserModel[]): void {
    this.users = users
  }

  @Mutation
  public fetchUsersFailure(): void {
    this.users = null
  }

  @Action({ rawError: true })
  public fetchUsers(): Promise<any> {
    return UserService.getUsers().then(
      (users: UserModel[]) => {
        this.fetchUsersSuccess(users)
        return Promise.resolve(users)
      },
      error => {
        this.fetchUsersFailure()
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        return Promise.reject(message)
      }
    )
  }

  get all(): UserModel[] {
    if (this.users) {
      return this.users
    }
    return []
  }
}

export default UserModule

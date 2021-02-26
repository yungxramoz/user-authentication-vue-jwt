import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

import UserService from '@/services/user-service'

import UserModel from '@/models/data/UserModel'
import AccountState from '@/models/state/account-state'

@Module({ namespaced: true, name: 'account' })
class AccountModule extends VuexModule {
  public accountState: AccountState = {
    accountData: null,
  }

  @Mutation
  public fetchUserSuccess(user: UserModel): void {
    this.accountState.accountData = user
  }

  @Mutation
  public fetchUserFailure(): void {
    this.accountState.accountData = null
  }

  @Action({ rawError: true })
  public fetchUser(id: number): Promise<any> {
    return UserService.getUser(id).then(
      (user: UserModel) => {
        this.fetchUserSuccess(user)
        return Promise.resolve(user)
      },
      error => {
        this.fetchUserFailure()
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        return Promise.reject(message)
      }
    )
  }

  get currentUser(): UserModel {
    const user = this.accountState.accountData
    return user ? user : ({} as UserModel)
  }
}

export default AccountModule

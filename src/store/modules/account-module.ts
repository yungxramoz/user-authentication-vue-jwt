import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

import UserService from '@/services/user-service'

import UserModel from '@/models/data/UserModel'
import AccountState from '@/models/state/account-state'

import { promiseErrorHandler } from '@/helpers/promise-error-handler'

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

  @Mutation
  public deleteUserSuccess(): void {
    this.accountState.accountData = null
  }

  @Mutation
  public deleteUserFailure(): void {}

  @Action({ rawError: true })
  public fetchUser(id: number): Promise<any> {
    return UserService.getUser(id).then(
      (user: UserModel) => {
        this.fetchUserSuccess(user)
        return Promise.resolve(user)
      },
      error => {
        return promiseErrorHandler(error, this.fetchUserFailure)
      }
    )
  }

  @Action({ rawError: true })
  public deleteUser(id: number): Promise<any> {
    return UserService.deleteUser(id).then(
      response => {
        this.deleteUserSuccess()
        return Promise.resolve(response.data)
      },
      error => {
        return promiseErrorHandler(error, this.deleteUserFailure)
      }
    )
  }

  get currentUser(): UserModel {
    const user = this.accountState.accountData
    return user ? user : ({} as UserModel)
  }
}

export default AccountModule

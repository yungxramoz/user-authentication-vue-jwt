import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

import AuthService from '@/services/auth-service'

import AuthenticationModel from '@/models/data/AuthenticateModel'
import UserModel from '@/models/data/UserModel'
import RegistrationModel from '@/models/data/RegistrationModel'

const storedUser = localStorage.getItem('user')

@Module({ namespaced: true, name: 'auth' })
class AuthModule extends VuexModule {
  public status = storedUser ? { loggedIn: true } : { loggedIn: false }
  public user: UserModel | null = storedUser ? JSON.parse(storedUser) : null

  @Mutation
  public loginSuccess(user: UserModel): void {
    this.status.loggedIn = true
    this.user = user
  }

  @Mutation
  public loginFailure(): void {
    this.status.loggedIn = false
    this.user = null
  }

  @Mutation
  public logoutSuccess(): void {
    this.status.loggedIn = false
    this.user = null
  }

  @Mutation
  public registerSuccess(): void {
    this.status.loggedIn = false
  }

  @Mutation
  public registerFailure(): void {
    this.status.loggedIn = false
  }

  @Action({ rawError: true })
  public login(data: AuthenticationModel): Promise<any> {
    return AuthService.login(data).then(
      (user: UserModel) => {
        this.loginSuccess(user)
        return Promise.resolve(user)
      },
      error => {
        this.loginFailure()
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        return Promise.reject(message)
      }
    )
  }

  @Action
  public logout(): void {
    AuthService.logout()
    this.logoutSuccess()
  }

  @Action({ rawError: true })
  public register(data: RegistrationModel): Promise<any> {
    return AuthService.register(data).then(
      response => {
        this.registerSuccess()
        return Promise.resolve(response.data)
      },
      error => {
        this.registerFailure()
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      }
    )
  }

  get isLoggedIn(): boolean {
    const loggedIn = this.status.loggedIn
    return loggedIn ? loggedIn : false
  }

  get fullname(): string {
    return `${this.user?.firstname} ${this.user?.lastname}`
  }
}
export default AuthModule

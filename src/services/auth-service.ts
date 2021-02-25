import axios, { AxiosResponse } from 'axios'

import AuthenticationModel from '@/models/AuthenticateModel'
import RegistrationModel from '@/models/RegistrationModel'
import UserModel from '@/models/UserModel'

const API_URL = 'https://localhost:44319/api/user/'

class AuthService {
  login(authData: AuthenticationModel): Promise<UserModel> {
    return axios
      .post(API_URL + 'authenticate', authData)
      .then((response: AxiosResponse<UserModel>) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout(): void {
    localStorage.removeItem('user')
  }

  register(registerData: RegistrationModel) {
    return axios.post(API_URL + 'register', registerData)
  }
}

export default new AuthService()

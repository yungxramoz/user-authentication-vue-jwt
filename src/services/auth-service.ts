import axios, { AxiosResponse } from 'axios'

import { AuthenticationModel, RegistrationModel, UserModel } from '@/models/data'

const API_URL = 'https://localhost:44319/api/user/'

class AuthService {
  login(authData: AuthenticationModel): Promise<UserModel> {
    return axios
      .post(API_URL + 'authenticate', authData)
      .then((response: AxiosResponse<UserModel>) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
          localStorage.setItem('userId', JSON.stringify(response.data.userId))
          localStorage.setItem('accessToken', JSON.stringify(response.data.token))
        }

        return response.data
      })
  }

  logout(): void {
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    localStorage.removeItem('accessToken')
  }

  register(registerData: RegistrationModel) {
    return axios.post(API_URL + 'register', registerData)
  }
}

export default new AuthService()

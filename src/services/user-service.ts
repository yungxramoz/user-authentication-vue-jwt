import axios, { AxiosResponse } from 'axios'

import AuthenticationModel from '@/models/data/AuthenticateModel'
import RegistrationModel from '@/models/data/RegistrationModel'
import UserModel from '@/models/data/UserModel'

import authHeader from './auth-header'
import UpdateUserModel from '@/models/data/UpdateUserModel'

const API_URL = 'https://localhost:44319/api/user/'

class UaserService {
  getUsers(): Promise<UserModel[]> {
    return axios
      .get(API_URL, { headers: authHeader() })
      .then((response: AxiosResponse<UserModel[]>) => {
        return response.data
      })
  }

  getUser(id: string): Promise<UserModel> {
    return axios
      .get(`${API_URL}${id}`, { headers: authHeader() })
      .then((response: AxiosResponse<UserModel>) => {
        return response.data
      })
  }

  updateUser(id: string, updateData: UpdateUserModel) {
    return axios.put(`${API_URL}${id}`, { data: updateData, headers: authHeader() })
  }
}

export default new UaserService()

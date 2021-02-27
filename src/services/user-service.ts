import axios, { AxiosResponse } from 'axios'

import { UserModel, UpdateUserModel } from '@/models/data'

import authHeader from './auth-header'

const API_URL = 'https://localhost:44319/api/user/'

class UaserService {
  getUsers(): Promise<UserModel[]> {
    return axios
      .get(API_URL, { headers: authHeader() })
      .then((response: AxiosResponse<UserModel[]>) => {
        return response.data
      })
  }

  getUser(id: number): Promise<UserModel> {
    return axios
      .get(`${API_URL}${id}`, { headers: authHeader() })
      .then((response: AxiosResponse<UserModel>) => {
        return response.data
      })
  }

  updateUser(id: number, data: UpdateUserModel) {
    return axios.put(`${API_URL}${id}`, data, { headers: authHeader() })
  }

  deleteUser(id: number) {
    return axios.delete(`${API_URL}${id}`, { headers: authHeader() })
  }
}

export default new UaserService()

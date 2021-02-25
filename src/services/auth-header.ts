import UserModel from '@/models/data/UserModel'

export default function authHeader() {
  const storedUser = localStorage.getItem('user')
  let user = JSON.parse(storedUser ? storedUser : '') as UserModel

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` }
  } else {
    return {}
  }
}

export default interface AuthState {
  loggedIn: boolean
  userId: number | null
  accessToken: string | null
}

export { AuthState }

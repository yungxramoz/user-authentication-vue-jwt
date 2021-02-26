export default interface AuthState {
  loggedIn: boolena
  userId: number | null
  accessToken: string | null
}

export { AuthState }

import { UserModel } from '@/models/data/UserModel'

export default interface AccountState {
  accountData: UserModel | null
}

export { AccountState }

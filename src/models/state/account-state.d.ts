import { UserModel } from '@/models/data'

export default interface AccountState {
  accountData: UserModel | null
}

export { AccountState }

import { actiontypes as C } from '../general/constants'

export const deleteAccount = () => ({
  type: C.DELETE_ACCOUNT
})
export const newAccount = account => ({
  type: C.ADD_ACCOUNT,
  encryptedPrivateKeyHex: account.encryptedPrivateKeyHex,
  salt: account.salt,
  publicKey: account.publicKey,
  alias: account.alias,
  passwordHash: account.passwordHash
})

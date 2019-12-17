import { actiontypes as C } from '../general/constants'
import jwt from 'jsonwebtoken'

export const deleteAccount = () => ({
  type: C.DELETE_ACCOUNT
})
export const newAccount = token => {
  var decoded = jwt.decode(token, { complete: true })
  console.log(decoded.header)
  console.log(decoded.payload)
  return ({
    type: C.ADD_ACCOUNT,
    token: token,
    username: decoded.payload.user,
    metadata: decoded.payload
  })
}

export const toogleDrawer = toogle => ({
  type: C.TOOGLE_DRAWER,
  toogle: toogle
})

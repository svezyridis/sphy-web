import { actiontypes as C } from '../general/constants'

export const account = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_ACCOUNT:
      return {
        token: action.token,
        username: action.username,
        metadata: action.metadata
      }
    case C.DELETE_ACCOUNT:
      return {}
    default:
      return state
  }
}

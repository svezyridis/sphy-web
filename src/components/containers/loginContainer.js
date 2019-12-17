import { connect } from 'react-redux'
import { newAccount } from '../../store/actions'
import Login from '../login/Login'

const LoginContainer = connect(
  ({ account }) => ({
    account: account
  }),
  dispatch => ({
    addAccount (token) {
      dispatch(newAccount(token))
    }
  })
)(Login)

export default LoginContainer

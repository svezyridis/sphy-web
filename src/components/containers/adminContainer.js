import { connect } from 'react-redux'
import { toogleDrawer, deleteAccount } from '../../store/actions'
import UserManagement from '../adminInfo/UserManagement'

export const UserManagementContainer = connect(
  ({ open, account, dark }) => ({
    dark: dark,
    open: open,
    account: account
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    },
    deleteAccount () {
      dispatch(deleteAccount())
    }
  })
)(UserManagement)


import { connect } from 'react-redux'
import { toogleDrawer, deleteAccount, addOrUpdateTest } from '../../store/actions'
import UserTests from '../test/UserTests'

export const UserTestsContainer = connect(
  ({ open, account, dark, tests }) => ({
    dark: dark,
    open: open,
    account: account,
    tests: tests
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    },
    deleteAccount () {
      dispatch(deleteAccount())
    },
    addOrUpdateTest (username, test) {
      dispatch(addOrUpdateTest(username, test))
    }
  })
)(UserTests)

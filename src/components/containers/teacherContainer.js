import { connect } from 'react-redux'
import { toogleDrawer, deleteAccount } from '../../store/actions'
import Classes from '../teacherInfo/Classes'
import Tests from '../teacherInfo/Tests'

export const ClassesContainer = connect(
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
)(Classes)

export const TestsContainer = connect(
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
)(Tests)

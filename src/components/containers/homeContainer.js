import { connect } from 'react-redux'
import { toogleDrawer, deleteAccount } from '../../store/actions'
import Home from '../home/Home'

const HomeContainer = connect(
  ({ open, account }) => ({
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
)(Home)

export default HomeContainer

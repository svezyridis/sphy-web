import { connect } from 'react-redux'
import { toogleDrawer } from '../../store/actions'
import Home from '../home/Home'

const HomeContainer = connect(
  ({ open }) => ({
    open: open
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    }
  })
)(Home)

export default HomeContainer

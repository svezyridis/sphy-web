import { connect } from 'react-redux'
import { toogleDrawer, deleteAccount } from '../../store/actions'
import Quiz from '../quiz/Quiz'

const QuizContainer = connect(
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
)(Quiz)

export default QuizContainer

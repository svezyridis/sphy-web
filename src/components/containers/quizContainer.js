import { connect } from 'react-redux'
import {
  toogleDrawer,
  deleteAccount,
  createQuiz,
  addQuestion,
  deleteQuiz,
  addQuestionImage
} from '../../store/actions'
import Quiz from '../quiz/Quiz'
import Question from '../quiz/Question'

export const QuizContainer = connect(
  ({ open, account, dark, quizes }) => ({
    open: open,
    account: account,
    dark: dark,
    quizes: quizes
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    },
    deleteAccount () {
      dispatch(deleteAccount())
    },
    createQuiz (username) {
      dispatch(createQuiz(username))
    },
    addQuestion (username, question) {
      dispatch(addQuestion(username, question))
    },
    deleteQuiz (username) {
      dispatch(deleteQuiz(username))
    }
  })
)(Quiz)

export const QuestionContainer = connect(
  ({ open, account, dark, quizes }) => ({
    open: open,
    account: account,
    dark: dark,
    quizes: quizes
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    },
    deleteAccount () {
      dispatch(deleteAccount())
    },
    deleteQuiz (username) {
      dispatch(deleteQuiz(username))
    },
    addImage (username, questionID, url) {
      dispatch(addQuestionImage(username, questionID, url))
    }
  })
)(Question)

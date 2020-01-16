import { connect } from 'react-redux'
import {
  toogleDrawer,
  deleteAccount,
  createQuiz,
  addQuestion,
  deleteQuiz,
  addQuestionImage,
  selectOption,
  setCategories,
  setChecked
} from '../../store/actions'
import Quiz from '../quiz/Quiz'
import Question from '../quiz/Question'
import Review from '../quiz/Review'

export const QuizContainer = connect(
  ({ open, account, dark, quizes, categories }) => ({
    open: open,
    account: account,
    dark: dark,
    quizes: quizes,
    categories: categories
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
    },
    setCategories (categories) {
      dispatch(setCategories(categories))
    },
    setChecked (categoryID, checked) {
      dispatch(setChecked(categoryID, checked))
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
    addQuestionImage (username, questionID, url) {
      dispatch(addQuestionImage(username, questionID, url))
    },
    selectOption (username, questionID, optionID) {
      dispatch(selectOption(username, questionID, optionID))
    }
  })
)(Question)

export const ReviewContainer = connect(
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
    addQuestionImage (username, questionID, url) {
      dispatch(addQuestionImage(username, questionID, url))
    },
    selectOption (username, questionID, optionID) {
      dispatch(selectOption(username, questionID, optionID))
    }
  })
)(Review)

import { connect } from 'react-redux'
import {
  toogleDrawer,
  deleteAccount,
  createQuiz,
  addQuestions,
  deleteQuiz,
  selectOption,
  setCategories,
  setChecked,
  deleteCategory,
  addCategory,
  completeQuiz
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
    addQuestions (username, questions) {
      dispatch(addQuestions(username, questions))
    },
    deleteQuiz (username) {
      dispatch(deleteQuiz(username))
    },
    deleteCategory (id) {
      dispatch(deleteCategory(id))
    },
    setCategories (categories) {
      dispatch(setCategories(categories))
    },
    addCategory (category) {
      dispatch(addCategory(category))
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
    selectOption (username, questionID, optionID) {
      dispatch(selectOption(username, questionID, optionID))
    },
    onSubmitQuiz (username) {
      dispatch(completeQuiz(username))
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
    selectOption (username, questionID, optionID) {
      dispatch(selectOption(username, questionID, optionID))
    }
  })
)(Review)

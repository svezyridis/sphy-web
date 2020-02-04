import { connect } from 'react-redux'
import {
  toogleDrawer,
  deleteAccount,
  addOrUpdateTest,
  beginTest,
  completeTest,
  answerQuestion,
  deleteTests
} from '../../store/actions'
import UserTests from '../test/UserTests'
import TestQuestion from '../test/TestQuestion'
import TestReview from '../test/TestReview'

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
    },
    beginTest (username, testID) {
      dispatch(beginTest(username, testID))
    },
    setFinished (username, testID) {
      dispatch(completeTest(username, testID))
    },
    deleteTests (username, newTests) {
      dispatch(deleteTests(username, newTests))
    }
  })
)(UserTests)

export const TestQuestionContainer = connect(
  ({ open, account, dark, quizes, tests }) => ({
    open: open,
    account: account,
    dark: dark,
    quizes: quizes,
    tests: tests
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    },
    deleteAccount () {
      dispatch(deleteAccount())
    },
    selectOption (username, testID, questionID, optionID) {
      dispatch(answerQuestion(username, testID, questionID, optionID))
    },
    onSubmitTest (username, testID) {
      dispatch(completeTest(username, testID))
    }
  })
)(TestQuestion)

export const TestReviewContainer = connect(
  ({ open, account, dark, tests }) => ({
    open: open,
    account: account,
    dark: dark,
    tests: tests
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    },
    deleteAccount () {
      dispatch(deleteAccount())
    }
  })
)(TestReview)

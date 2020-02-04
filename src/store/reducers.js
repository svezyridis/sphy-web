import { actiontypes as C } from '../general/constants'
import find from 'lodash.find'
import isEmpty from 'lodash.isempty'
import findIndex from 'lodash.findindex'
import timestamp from 'time-stamp'

export const account = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_ACCOUNT:
      return {
        metadata: action.metadata
      }
    case C.DELETE_ACCOUNT:
      return {}
    default:
      return state
  }
}

export const open = (state = true, action) => {
  switch (action.type) {
    case C.TOOGLE_DRAWER:
      return !state
    default:
      return state
  }
}

export const dark = (state = false, action) => {
  switch (action.type) {
    case C.TOOGLE_DARK:
      return !state
    default:
      return state
  }
}

export const tests = (state = [], action) => {
  switch (action.type) {
    case C.ADD_OR_UPDATE_TEST:
      if (findIndex(state, { username: action.username }) === -1) {
        return [
          ...state,
          {
            username: action.username,
            tests: [{ ...action.test, answers: [] }]
          }
        ]
      }
      return state.map(testsOfUser =>
        testsOfUser.username === action.username
          ? {
            username: testsOfUser.username,
            tests: userTests(testsOfUser.tests, action)
          }
          : testsOfUser
      )
    case C.START_TEST:
      return state.map(testsOfUser =>
        testsOfUser.username === action.username
          ? {
            username: testsOfUser.username,
            tests: userTests(testsOfUser.tests, action)
          }
          : testsOfUser
      )
    case C.FINISH_TEST:
      return state.map(testsOfUser =>
        testsOfUser.username === action.username
          ? {
            username: testsOfUser.username,
            tests: userTests(testsOfUser.tests, action)
          }
          : testsOfUser
      )
    case C.SELECT_ANSWER:
      return state.map(testsOfUser =>
        testsOfUser.username === action.username
          ? {
            username: testsOfUser.username,
            tests: userTests(testsOfUser.tests, action)
          }
          : testsOfUser
      )
    case C.DELETE_TESTS:
      return state.map(testsOfUser =>
        testsOfUser.username === action.username
          ? {
            username: testsOfUser.username,
            tests: userTests(testsOfUser.tests, action)
          }
          : testsOfUser
      )
    default:
      return state
  }
}

export const userTests = (state = [], action) => {
  let testToUpdate
  switch (action.type) {
    case C.ADD_OR_UPDATE_TEST:
      testToUpdate = find(state, { id: action.test.id })
      if (isEmpty(testToUpdate)) {
        return [
          ...state,
          {
            ...action.test,
            myAnswers: action.test.questions.map(question => ({
              questionID: question.id,
              optionID: '-1'
            }))
          }
        ]
      }
      return state.map(userTest => test(userTest, action))
    case C.START_TEST:
      return state.map(userTest =>
        userTest.id === action.id
          ? { ...userTest, startedAt: timestamp('YYYY-MM-DD HH:mm') }
          : userTest
      )
    case C.SELECT_ANSWER:
      return state.map(userTest =>
        userTest.id === action.id
          ? { ...userTest, myAnswers: answers(userTest.myAnswers, action) }
          : userTest
      )
    case C.FINISH_TEST:
      return state.map(userTest => {
        return userTest.id === action.id
          ? { ...userTest, finished: true }
          : userTest
      })
    case C.DELETE_TESTS:
      return state.filter(userTest =>
        findIndex(action.tests, { id: userTest.id }) !== -1
      )
    default:
      return state
  }
}
export const test = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_OR_UPDATE_TEST:
      return state.id === action.test.id
        ? {
          ...state,
          activationTime: action.test.activationTime,
          completionTime: action.test.completionTime,
          answers: action.test.answers
        }
        : state
    default:
      return state
  }
}

export const quizes = (state = [], action) => {
  switch (action.type) {
    case C.CREATE_QUIZ:
      return isEmpty(find(state, { username: action.username }))
        ? [...state, quiz({}, action)]
        : state
    case C.ADD_QUESTION:
      return state.map(userQuiz => quiz(userQuiz, action))
    case C.SELECT_OPTION:
      return state.map(userQuiz => quiz(userQuiz, action))
    case C.COMPLETE_QUIZ:
      return state.map(userQuiz => quiz(userQuiz, action))
    case C.DELETE_QUIZ:
      return state.filter(quiz => quiz.username !== action.username)
    default:
      return state
  }
}

export const quiz = (state, action) => {
  switch (action.type) {
    case C.CREATE_QUIZ:
      return {
        username: action.username,
        questions: [],
        myAnswers: []
      }
    case C.ADD_QUESTION:
      return state.username !== action.username
        ? state
        : {
          ...state,
          questions: questions(state.questions, action),
          myAnswers: answers(state.myAnswers, action)
        }
    case C.SELECT_OPTION:
      return state.username !== action.username
        ? state
        : {
          ...state,
          myAnswers: answers(state.myAnswers, action)
        }
    case C.ADD_QUESTION_IMAGE:
      return state.username !== action.username
        ? state
        : {
          ...state,
          questions: questions(state.questions, action)
        }
    case C.COMPLETE_QUIZ:
      return state.username !== action.username
        ? state
        : {
          ...state,
          finished: true
        }
    default:
      return state
  }
}

const questions = (state, action) => {
  switch (action.type) {
    case C.ADD_QUESTION:
      return isEmpty(find(state, { id: action.id }))
        ? [...state, action.question]
        : state
    case C.ADD_QUESTION_IMAGE:
      return state.map(question => {
        console.log(question)
        return question.id === action.questionID
          ? { ...question, imageURL: action.url }
          : { ...question, imageURL: action.url }
      })
    default:
      return state
  }
}

const answers = (state, action) => {
  switch (action.type) {
    case C.ADD_QUESTION:
      return isEmpty(find(state, { questionID: action.id }))
        ? [...state, { questionID: action.id, optionID: '-1' }]
        : state
    case C.SELECT_OPTION:
      return state.map(answer =>
        answer.questionID === action.questionID
          ? { ...answer, optionID: action.optionID }
          : answer
      )
    case C.SELECT_ANSWER:
      return state.map(answer =>
        answer.questionID === action.questionID
          ? { ...answer, optionID: action.optionID }
          : answer
      )
    default:
      return state
  }
}

export const subjects = (state = [], action) => {
  switch (action.type) {
    case C.SET_SUBJECTS:
      return action.subjects
    case C.ADD_SUBJECT_IMAGE:
      return state.map(subject =>
        subject.id === action.id
          ? {
            ...subject,
            image: action.image
          }
          : subject
      )
    case C.DELETE_SUBJECT:
      return state.filter(subject => subject.id !== action.id)
    case C.ADD_SUBJECT:
      return [...state, action.subject]
    default:
      return state
  }
}

export const imagesReducer = (state, action) => {
  switch (action.type) {
    case C.SET_IMAGES:
      return action.images
    case C.ADD_IMAGE:
      return state.map(image =>
        image.id === action.id
          ? {
            ...image,
            image: action.image
          }
          : image
      )
    default:
      return state
  }
}

export const categories = (state = [], action) => {
  switch (action.type) {
    case C.SET_CATEGORIES:
      return action.categories.map(category => ({
        ...category,
        checked: true
      }))
    case C.DELETE_CATEGORY:
      return state.filter(category => category.id !== action.id)
    case C.ADD_CATEGORY:
      return [...state, action.category]
    case C.ADD_CATEGORY_IMAGE:
      return state.map(category =>
        category.id === action.id
          ? {
            ...category,
            imageURL: action.image
          }
          : category
      )
    case C.SET_CHECKED:
      return state.map(category =>
        category.id === action.id
          ? {
            ...category,
            checked: action.checked
          }
          : category
      )
    default:
      return state
  }
}

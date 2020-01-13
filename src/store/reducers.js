import { actiontypes as C } from '../general/constants'
import find from 'lodash.find'
import isEmpty from 'lodash.isempty'

export const account = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_ACCOUNT:
      return {
        token: action.token,
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

export const categoriesReducer = (state, action) => {
  switch (action.type) {
    case C.SET_CATEGORIES:
      return action.categories.map(category => ({
        ...category,
        checked: true
      }))
    case C.ADD_IMAGE:
      return state.map(category =>
        category.id === action.id
          ? {
              ...category,
              image: action.image
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
        answers: []
      }
    case C.ADD_QUESTION:
      return state.username !== action.username
        ? state
        : {
            ...state,
            questions: questions(state.questions, action),
            answers: answers(state.answers, action)
          }
    case C.SELECT_OPTION:
      return state.username !== action.username
        ? state
        : {
            ...state,
            answers: answers(state.answers, action)
          }
    case C.ADD_QUESTION_IMAGE:
      console.log(action)
      return state.username !== action.username
        ? state
        : {
            ...state,
            questions: questions(state.questions, action)
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
      return state.map(question =>
        question.id === action.questionID
          ? state
          : { ...state, imageURL: action.url }
      )
    default:
      return state
  }
}

const answers = (state, action) => {
  switch (action.type) {
    case C.ADD_QUESTION:
      return isEmpty(find(state, { questionID: action.id }))
        ? [...state, { questionID: action.id }]
        : state
    case C.SELECT_OPTION:
      return state.map(answer =>
        answer.questionID === action.questionID
          ? { ...state, optionID: action.optionID }
          : state
      )
    default:
      return state
  }
}

export const subjectsReducer = (state, action) => {
  switch (action.type) {
    case C.SET_SUBJECTS:
      return action.subjects
    case C.ADD_IMAGE:
      return state.map(subject =>
        subject.id === action.id
          ? {
              ...subject,
              image: action.image
            }
          : subject
      )
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

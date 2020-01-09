import { actiontypes as C } from '../general/constants'
import find from 'lodash.find'

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
      return [...state, quiz({}, action)]
    case C.ADD_QUESTION:
      return state.map(userQuiz => quiz(userQuiz, action))
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
            questions: find(state.questions, { id: action.id })
              ? state.questions
              : [...state.questions, action.question]
          }
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

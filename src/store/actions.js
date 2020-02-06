import { actiontypes as C } from '../general/constants'
import jwt from 'jsonwebtoken'

export const deleteAccount = () => ({
  type: C.DELETE_ACCOUNT
})
export const newAccount = token => {
  var decoded = jwt.decode(token, { complete: true })
  return {
    type: C.ADD_ACCOUNT,
    metadata: JSON.parse(decoded.payload.metadata)
  }
}

export const toogleDrawer = toogle => ({
  type: C.TOOGLE_DRAWER,
  toogle: toogle
})

export const toogleDark = () => ({
  type: C.TOOGLE_DARK
})

export const setCategories = categories => ({
  type: C.SET_CATEGORIES,
  categories: categories
})

export const setSubjects = subjects => ({
  type: C.SET_SUBJECTS,
  subjects: subjects
})

export const deleteSubject = id => ({
  type: C.DELETE_SUBJECT,
  id: id
})

export const addSubjectImage = (id, image) => ({
  type: C.ADD_SUBJECT_IMAGE,
  id: id,
  image: image
})

export const addSubject = subject => ({
  type: C.ADD_SUBJECT,
  subject: subject
})

export const setImages = images => ({
  type: C.SET_IMAGES,
  images: images
})

export const addCategoryImage = (id, image) => ({
  type: C.ADD_CATEGORY_IMAGE,
  id: id,
  image: image
})

export const setChecked = (id, checked) => ({
  type: C.SET_CHECKED,
  id: id,
  checked: checked
})

export const createQuiz = username => ({
  type: C.CREATE_QUIZ,
  username: username
})

export const completeQuiz = username => ({
  type: C.COMPLETE_QUIZ,
  username: username
})

export const addQuestions = (username, questions) => ({
  type: C.ADD_QUESTIONS,
  questions: questions,
  username: username
})

export const selectOption = (username, questionID, optionID) => ({
  type: C.SELECT_OPTION,
  username: username,
  questionID: questionID,
  optionID: optionID
})

export const deleteQuiz = username => ({
  type: C.DELETE_QUIZ,
  username: username
})

export const deleteCategory = id => ({
  type: C.DELETE_CATEGORY,
  id: id
})

export const addCategory = category => ({
  type: C.ADD_CATEGORY,
  category: category
})

export const addImage = (id, image) => ({
  type: C.ADD_IMAGE,
  id: id,
  image: image
})

export const addOrUpdateTest = (username, test) => ({
  type: C.ADD_OR_UPDATE_TEST,
  username: username,
  test: test
})

export const beginTest = (username, testID) => {
  return {
    type: C.START_TEST,
    username: username,
    id: testID
  }
}

export const completeTest = (username, testID) => ({
  type: C.FINISH_TEST,
  username: username,
  id: testID
})

export const answerQuestion = (username, testID, questionID, optionID) => ({
  type: C.SELECT_ANSWER,
  username: username,
  id: testID,
  questionID,
  optionID
})

export const deleteTests = (username, tests) => ({
  type: C.DELETE_TESTS,
  tests: tests
})

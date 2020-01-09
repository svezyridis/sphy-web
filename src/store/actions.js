import { actiontypes as C } from '../general/constants'
import jwt from 'jsonwebtoken'

export const deleteAccount = () => ({
  type: C.DELETE_ACCOUNT
})
export const newAccount = token => {
  var decoded = jwt.decode(token, { complete: true })
  return {
    type: C.ADD_ACCOUNT,
    token: token,
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

export const setImages = images => ({
  type: C.SET_IMAGES,
  images: images
})

export const addImage = (id, image) => ({
  type: C.ADD_IMAGE,
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

export const addQuestion = (username, question) => ({
  type: C.ADD_QUESTION,
  id: question.id,
  question: question
})

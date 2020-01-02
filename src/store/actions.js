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

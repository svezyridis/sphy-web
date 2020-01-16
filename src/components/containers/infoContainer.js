import { connect } from 'react-redux'
import { toogleDrawer, deleteAccount, deleteCategory, setCategories, addCategoryImage, addCategory } from '../../store/actions'
import MainInfo from '../Info/Main'
import Weapon from '../Info/Weapon'
import Category from '../Info/Category'
import Subject from '../Info/Subject'

const InfoContainer = connect(
  ({ dark, open, account }) => ({
    open: open,
    account: account,
    dark: dark
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    },
    deleteAccount () {
      dispatch(deleteAccount())
    }
  })
)(MainInfo)

export const WeaponContainer = connect(
  ({ dark, open, account, categories }) => ({
    open: open,
    account: account,
    dark: dark,
    categories: categories
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    },
    deleteAccount () {
      dispatch(deleteAccount())
    },
    deleteCategory (id) {
      dispatch(deleteCategory(id))
    },
    setCategories (categories) {
      dispatch(setCategories(categories))
    },
    addImage (id, image) {
      dispatch(addCategoryImage(id, image))
    },
    addCategory (category) {
      dispatch(addCategory(category))
    }

  })
)(Weapon)

export const CategoryContainer = connect(
  ({ open, account, dark }) => ({
    dark: dark,
    open: open,
    account: account
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    },
    deleteAccount () {
      dispatch(deleteAccount())
    }
  })
)(Category)

export const SubjectContainer = connect(
  ({ open, account, dark }) => ({
    open: open,
    account: account,
    dark: dark
  }),
  dispatch => ({
    toogleDrawer (toogle) {
      dispatch(toogleDrawer(toogle))
    },
    deleteAccount () {
      dispatch(deleteAccount())
    }
  })
)(Subject)

export default InfoContainer

import React, { useEffect, useState, useReducer } from 'react'
import DefaultAppBar from '../DefaultAppBar'
import Copyright from '../Copyright'
import homeStyle from '../../styles/homeStyle'
import classNames from 'classnames'
import isEmpty from 'lodash.isempty'
import HomeDrawer from '../home/HomeDrawer'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { fetch } from 'whatwg-fetch'
import Grid from '@material-ui/core/Grid'
import CategoryCard from './CategoryCard'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import HomeIcon from '@material-ui/icons/Home'
import { titleCase, getBranchName } from '../../general/helperFunctions'
import { baseURL } from '../../general/constants'
import find from 'lodash.find'
import isEqual from 'lodash.isequal'
import NewCategoryCard from '../adminInfo/NewCategoryCard'

const categoriesURL = baseURL + 'category/'
const imagesURL = baseURL + 'image/'

const Weapon = ({
  open,
  toogleDrawer,
  account,
  deleteAccount,
  categories,
  setCategories,
  addImage,
  addCategory,
  deleteCategory,
  match,
  history,
  dark
}) => {
  var controller = new window.AbortController()
  var signal = controller.signal
  const classes = homeStyle()
  const [error, setError] = useState('')
  const branch = match.params.weapon

  const getImageOfCategory = async category => {
    try {
      const response = await fetch(
        imagesURL +
          branch +
          '/' +
          category.uri +
          '/' +
          category.image.subject +
          '/' +
          category.image.filename,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            authorization: 'Bearer ' + account.token
          },
          signal: signal
        }
      )
      const image = await response.blob()
      var imageUrl = URL.createObjectURL(image)
      addImage(category.id, imageUrl)
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isEmpty(account)) {
      history.push('/login')
      return null
    }

    fetch(categoriesURL + branch, {
      method: 'GET',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + account.token
      },
      signal: signal,
      cache: 'force-cache'
    })
      .then(response => response.json())
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error') setError(message)
        else {
          // Compare new categories with stored ones and make the necessary changes
          const newCategories = []
          const categoriesToDelete = []

          result.forEach(category => {
            const storedCategory = find(categories, { id: category.id })
            if (!storedCategory) {
              console.log('category not found')
              newCategories.push(category)
              return
            }
            const {
              imageURL,
              checked,
              ...originalCategoryObject
            } = storedCategory
            if (!isEqual(originalCategoryObject, category)) {
              console.log('category found but not equal')
              newCategories.push(category)
              categoriesToDelete.push(storedCategory)
            }
          })

          categories.forEach(category => {
            if (!find(result, { id: category.id })) {
              categoriesToDelete.push(category)
            }
          })

          categoriesToDelete.forEach(category => deleteCategory(category.id))

          // add new categories and fetch their images
          newCategories.forEach(category => {
            addCategory(category)
            getImageOfCategory(category)
          })
          // check categories that need new image fetching
          categories.forEach(category => {
            fetch(category.imageURL).catch(error => {
              console.log(error)
              getImageOfCategory(category)
            })
          })
        }
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
    return () => {
      controller.abort()
    }
  }, [])

  if (isEmpty(account)) {
    history.push('/login')
    return null
  }
  const isAdmin = account.metadata.role === 'ADMIN'

  return (
    <div className={classes.root}>
      <DefaultAppBar open={open} onClick={toogleDrawer} classes={classes} />
      <HomeDrawer
        open={open}
        setOpen={toogleDrawer}
        account={account}
        deleteAccount={deleteAccount}
        classes={classes}
      />
      <div className={classNames(classes.rest, !open && classes.closed)}>
        <Breadcrumbs>
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push('/')
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            <HomeIcon className={classes.icon} />
            Home
          </Link>
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push('/info')
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            <LocalLibraryIcon className={classes.icon} />
            Info
          </Link>
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push(`/info/${branch}`)
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            {titleCase(getBranchName(branch))}
          </Link>
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary' align='center'>
          Επιλέξτε κατηγορία
        </Typography>
        <Grid
          container
          alignItems='center'
          justify='center'
          spacing={5}
          className={classes.grid}
        >
          {categories.map((category, index) => {
            return (
              <Grid key={index} item>
                <CategoryCard
                  key={index}
                  category={category}
                  name={category.name}
                  admin={isAdmin}
                  branch={branch}
                  token={account.token}
                />
              </Grid>
            )
          })}
          <Grid item>
            <NewCategoryCard branch={branch} token={account.token} />
          </Grid>
        </Grid>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Weapon

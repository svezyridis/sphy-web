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
import { setCategories, addImage } from '../../store/actions'
import { categoriesReducer } from '../../store/reducers'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import HomeIcon from '@material-ui/icons/Home'
import { titleCase } from '../../general/helperFunctions'
import { baseURL } from '../../general/constants'

const categoriesURL = baseURL + 'category/'
const imagesURL = baseURL + 'image/'

const Weapon = ({
  open,
  toogleDrawer,
  account,
  deleteAccount,
  match,
  history,
  dark
}) => {
  var controller = new window.AbortController()
  var signal = controller.signal
  const classes = homeStyle()
  const [error, setError] = useState('')
  const [categories, dispatchCategories] = useReducer(categoriesReducer, [])
  const branch = match.params.weapon

  useEffect(() => {
    if (isEmpty(account)) {
      var tempAccount = window.sessionStorage.getItem('account')
      if (isEmpty(tempAccount)) {
        history.push('/login')
        return null
      }
      account = tempAccount
    }

    fetch(categoriesURL + branch, {
      method: 'GET',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + account.token
      },
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error') setError(message)
        else {
          dispatchCategories(setCategories(result))
          result.forEach(async (category, index) => {
            if (!category.randomImage) {
              return
            }
            try {
              const response = await fetch(
                imagesURL +
                  branch +
                  '/' +
                  category.name.toLowerCase() +
                  '/' +
                  category.randomImage.subject +
                  '/' +
                  category.randomImage.filename,
                {
                  method: 'GET',
                  credentials: 'include',
                  headers: {
                    authorization: 'Bearer ' + account.token
                  },
                  signal: signal
                })
              const image = await response.blob()
              var imageUrl = URL.createObjectURL(image)
              dispatchCategories(addImage(category.id, imageUrl))
            } catch (error) {
              if (!controller.signal.aborted) {
                console.error(error)
              }
            }
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
            {titleCase(branch)}
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
                  image={category.image}
                  name={category.name}
                  weapon={branch}
                />
              </Grid>
            )
          })}
        </Grid>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Weapon

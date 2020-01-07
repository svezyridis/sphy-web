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
import { setSubjects, addImage } from '../../store/actions'
import { subjectsReducer } from '../../store/reducers'
import sample from 'lodash.sample'
import SubjectCard from './SubjectCard'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import HomeIcon from '@material-ui/icons/Home'
import { titleCase } from '../../general/helperFunctions'
import { baseURL } from '../../general/constants'

const subjectsURL = baseURL + 'subject/'
const imagesURL = baseURL + 'image/'

const Category = ({
  open,
  toogleDrawer,
  account,
  deleteAccount,
  match,
  history
}) => {
  const classes = homeStyle()
  const [error, setError] = useState('')
  const [subjects, dispatchSubjects] = useReducer(subjectsReducer, [])
  const branch = match.params.weapon
  const category = match.params.category

  useEffect(() => {
    if (isEmpty(account)) {
      var tempAccount = window.sessionStorage.getItem('account')
      if (isEmpty(tempAccount)) {
        history.push('/login')
        return null
      }
      account = tempAccount
    }

    fetch(subjectsURL + branch + '/' + category, {
      method: 'GET',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + account.token
      }
    })
      .then(response => response.json())
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error' || status === 500) setError(message)
        else {
          dispatchSubjects(setSubjects(result))
          result.forEach(async (subject, index) => {
            if (subject.images.length === 0) {
              return
            }
            const response = await fetch(
              imagesURL +
                branch +
                '/' +
                category.toLowerCase() +
                '/' +
                subject.name +
                '/' +
                sample(subject.images).filename,
              {
                method: 'GET',
                credentials: 'include',
                headers: {
                  authorization: 'Bearer ' + account.token
                }
              }
            )
            const image = await response.blob()
            var imageUrl = URL.createObjectURL(image)
            dispatchSubjects(addImage(subject.id, imageUrl))
          })
        }
      })
      .catch(error => console.error(error))
    return () => {}
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
            className={classes.link}
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
            className={classes.link}
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
          >
            {titleCase(branch)}
          </Link>
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push(`/info/${branch}/${category}`)
            }}
          >
            {titleCase(category)}
          </Link>
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary'>
          Επιλέξτε θέμα
        </Typography>
        <Grid
          container
          alignItems='center'
          justify='center'
          spacing={5}
          className={classes.grid}
        >
          {subjects.map((subject, index) => {
            return (
              <Grid key={index} item>
                <SubjectCard subject={subject} weapon={branch} />
              </Grid>
            )
          })}
        </Grid>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Category

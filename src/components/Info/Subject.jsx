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
import { setImages, addImage } from '../../store/actions'
import { imagesReducer } from '../../store/reducers'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import HomeIcon from '@material-ui/icons/Home'
import { titleCase } from '../../general/helperFunctions'
import { baseURL } from '../../general/constants'
import Paper from '@material-ui/core/Paper'

const subjectsURL = baseURL + 'subject/'
const imagesURL = baseURL + 'image/'

const Subject = ({
  open,
  toogleDrawer,
  account,
  deleteAccount,
  match,
  location,
  history
}) => {
  const classes = homeStyle()
  const [error, setError] = useState('')
  const [images, dispatchImages] = useReducer(imagesReducer, [])
  const [subject, setsubject] = useState({})
  const branch = match.params.weapon
  const category = match.params.category
  const subjectName = match.params.subject

  const getImages = imageArray => {
    imageArray.forEach(async image => {
      const response = await fetch(
        imagesURL +
          branch +
          '/' +
          category.toLowerCase() +
          '/' +
          subjectName +
          '/' +
          image.filename,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            authorization: 'Bearer ' + account.token
          }
        }
      )
      const imageFile = await response.blob()
      var imageUrl = URL.createObjectURL(imageFile)
      dispatchImages(addImage(image.id, imageUrl))
    })
  }

  useEffect(() => {
    if (isEmpty(account)) {
      var tempAccount = window.sessionStorage.getItem('account')
      if (isEmpty(tempAccount)) {
        history.push('/login')
        return null
      }
      account = tempAccount
    }

    if (!location.state) {
      fetch(subjectsURL + subjectName, {
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
            setsubject(result)
            if (result.images.length === 0) {
              return
            }
            dispatchImages(setImages(result.images))
            getImages(result.images)
          }
        })
        .catch(error => console.error(error))
    } else {
      setsubject(location.state.subject)
      dispatchImages(setImages(location.state.subject.images))
      getImages(location.state.subject.images)
    }

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
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push(`/info/${branch}/${category}/${subject.name}`)
            }}
          >
            {titleCase(subject.name) ? titleCase(subject.name) : ''}
          </Link>
        </Breadcrumbs>
        <Typography variant='h2' align='center' color='textPrimary'>
          {subject.name}
        </Typography>
        <Typography variant='h4' align='center' color='textPrimary'>
          {subject.text}
        </Typography>
        <Paper elevation={5} className={classes.infoPaper}>
          sth
        </Paper>
        {/**
          <Grid
            container
            alignItems='center'
            justify='center'
            spacing={5}
            className={classes.grid}
          >
            {images.map((image, index) => {
              return <img key={index} src={image.image} alt={image.label} />
            })}
          </Grid>
           */}
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Subject

import React, { useEffect, useState, useReducer, useRef } from 'react'
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
import { titleCase, getBranchName } from '../../general/helperFunctions'
import { baseURL } from '../../general/constants'
import Paper from '@material-ui/core/Paper'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Fab from '@material-ui/core/Fab'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'
import ImageDialog from './ImageDialog'
import { Divider } from '@material-ui/core'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import findIndex from 'lodash.findindex'
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from 'react-image-magnifiers'

const subjectsURL = baseURL + 'subject/'
const imagesURL = baseURL + 'image/'

const Subject = ({
  open,
  dark,
  toogleDrawer,
  subjects,
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
  const [imageDialog, setImageDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const gridList = useRef(null)
  const branch = match.params.weapon
  const category = match.params.category
  const subjectURI = match.params.subject
  var controller = new window.AbortController()
  var signal = controller.signal
  const getImages = imageArray => {
    imageArray.forEach(image => {
      var imageUrl =
        imagesURL +
        branch +
        '/' +
        category.toLowerCase() +
        '/' +
        subjectURI +
        '/' +
        image.filename
      dispatchImages(addImage(image.id, imageUrl))
    })
  }

  const handleLeft = () => {
    gridList.current.scroll({
      left: gridList.current.scrollLeft - 400,
      behavior: 'smooth'
    })
  }

  const handleRight = () => {
    gridList.current.scroll({
      left: gridList.current.scrollLeft + 400,
      behavior: 'smooth'
    })
  }

  const nextSubjectHandler = () => {
    var subjectFoundIndex = findIndex(subjects, { uri: subjectURI })
    if (subjectFoundIndex === subjects.length - 1) {
      var nextURI = subjects[0].uri
    } else {
      var nextURI = subjects[subjectFoundIndex + 1].uri
    }
    var nextSubjectURI =
      '/info/' + branch + '/' + category.toLowerCase() + '/' + nextURI
    history.push(nextSubjectURI)
  }

  const previousSubjectHandler = () => {
    var subjectFoundIndex = findIndex(subjects, { uri: subjectURI })
    if (subjectFoundIndex === 0) {
      var nextURI = subjects[subjects.length - 1].uri
    } else {
      var nextURI = subjects[subjectFoundIndex - 1].uri
    }
    var nextSubjectURI =
      '/info/' + branch + '/' + category.toLowerCase() + '/' + nextURI
    history.push(nextSubjectURI)
  }

  const nextSelectedImage = () => {
    setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)
  }
  const previousSelectedImage = () => {
    setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)
  }
  useEffect(() => {
    if (isEmpty(account)) {
      var tempAccount = window.sessionStorage.getItem('account')
      if (isEmpty(tempAccount)) {
        history.push('/login')
        return null
      }
    }

    if (!location.state) {
      fetch(subjectsURL + subjectURI, {
        method: 'GET',
        credentials: 'include',
        signal: signal
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else throw Error(`Request rejected with status ${response.status}`)
        })
        .then(data => {
          const { status, result, message } = data
          console.log(data)
          if (status === 'error') setError(message)
          else {
            setsubject(result)
            if (result.images.length === 0) {
              return
            }
            dispatchImages(setImages(result.images))
            getImages(result.images)
          }
        })
        .catch(error => {
          if (!controller.signal.aborted) {
            console.error(error)
          }
        })
    } else {
      setsubject(location.state.subject)
      dispatchImages(setImages(location.state.subject.images))
      getImages(location.state.subject.images)
    }

    return () => {
      controller.abort()
    }
  }, [subjectURI])

  return (
    <div className={classes.root}>
      <DefaultAppBar classes={classes} />
      <ImageDialog
        open={imageDialog}
        images={images}
        index={selectedImage}
        onClose={() => setImageDialog(!imageDialog)}
        onNext={nextSelectedImage}
        onPrevious={previousSelectedImage}
      />
      <HomeDrawer
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
            Αρχική
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
            Εκπαίδευση
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
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push(`/info/${branch}/${category}`)
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            {category}
          </Link>
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push(`/info/${branch}/${category}/${subject.name}`)
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            {subject.name ? subject.name : ''}
          </Link>
        </Breadcrumbs>
        <Typography variant='h2' align='center' color='textPrimary'>
          {subject.name}
        </Typography>
        <Paper elevation={10} className={classes.infoPaper}>
          <div className={classes.infoContent}>
            <Fab
              color={dark ? 'secondary' : 'primary'}
              className={classes.leftIcon}
              onClick={handleLeft}
            >
              <ChevronLeftRoundedIcon />
            </Fab>
            <Fab
              color={dark ? 'secondary' : 'primary'}
              className={classes.rightIcon}
              onClick={handleRight}
            >
              <ChevronRightRoundedIcon />
            </Fab>
            <GridList className={classes.gridList} cols={2.5} ref={gridList}>
              {images.map((image, index) => (
                <GridListTile
                  key={index}
                  onClick={() => {
                    setImageDialog(true)
                    setSelectedImage(index)
                  }}
                  className={classes.tile}
                >
                  <img src={image.image} alt={image.filename} />
                  <GridListTileBar
                    title={
                      <Typography align='center' variant='h5'>
                        {image.label}
                      </Typography>
                    }
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                  />
                </GridListTile>
              ))}
            </GridList>
            <Divider />
            <Typography
              variant='body1'
              align='left'
              color='textPrimary'
              component='div'
              className={classNames(
                classes.paragraph,
                dark && classes.paragraphDark
              )}
            >
              <b>
                <p>{subject.general ? 'Γενικά' : null}</p>
              </b>
              {subject.general
                ? subject.general
                    .split('\n')
                    .map((paragraph, key) => <p key={key}>{paragraph}</p>)
                : null}
            </Typography>
          </div>
        </Paper>
        <Fab
          color={dark ? 'secondary' : 'primary'}
          className={classes.leftThemeIcon}
          onClick={previousSubjectHandler}
        >
          <ArrowBackRoundedIcon />
        </Fab>
        <Fab
          color={dark ? 'secondary' : 'primary'}
          className={classes.rightThemeIcon}
          onClick={nextSubjectHandler}
        >
          <ArrowForwardRoundedIcon />
        </Fab>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Subject

import React, { useEffect, useState } from 'react'
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
import SubjectCard from './SubjectCard'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import HomeIcon from '@material-ui/icons/Home'
import { titleCase, getBranchName } from '../../general/helperFunctions'
import { baseURL } from '../../general/constants'
import NewSubjectCard from '../adminInfo/NewSubjectCard'
import LoadingDialog from '../quiz/LoadingDialog'

const subjectsURL = baseURL + 'subject/'
const imagesURL = baseURL + 'image/'

const Category = ({
  open,
  toogleDrawer,
  account,
  deleteAccount,
  dark,
  subjects,
  setSubjects,
  addImage,
  addSubject,
  deleteSubject,
  match,
  history,
  location
}) => {
  const classes = homeStyle()
  const [error, setError] = useState('')
  const branch = match.params.weapon
  const category = match.params.category
  subjects = subjects.filter(subject => subject.category === category)
  const controller = new window.AbortController()
  const [reason, setReason] = useState('')
  const signal = controller.signal

  const handleDelete = subject => {
    fetch(subjectsURL + branch + '/' + category + '/' + subject.uri, {
      method: 'DELETE',
      credentials: 'include',
      signal: signal
    })
      .then(response => {
        if (response.ok) { return response.json() } else throw Error(`Request rejected with status ${response.status}`)
      })
      .then(data => {
        const { status, message } = data
        console.log(message)
        if (status === 'success') {
          deleteSubject(subject.id)
        }
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }

  const getSubjects = () => {
    setReason('Γίνεται λήψη θεμάτων')
    fetch(subjectsURL + branch + '/' + category, {
      method: 'GET',
      credentials: 'include',
      signal: signal
    })
      .then(response => {
        if (response.ok) { return response.json() } else throw Error(`Request rejected with status ${response.status}`)
      })
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error') {
          setReason('')
          setError(message)
        } else {
          setSubjects(result)
          result.forEach(async (subject, index) => {
            if (!(subject.defaultImage && subject.defaultImage.filename)) {
              return
            }
            var imageUrl = imagesURL +
              branch +
              '/' +
              category +
              '/' +
              subject.uri +
              '/' +
              subject.defaultImage.filename
            addImage(subject.id, imageUrl)
          })
          setReason('')
        }
      })
      .catch(error => {
        setReason('')
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }

  useEffect(() => {
    if (isEmpty(account)) {
      return
    }
    getSubjects()
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
      <LoadingDialog open={reason !== ''} reason={reason} />
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
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary' align='center'>
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
                <SubjectCard
                  subject={subject}
                  branch={branch}
                  admin={isAdmin}
                  category={category}
                  getSubjects={getSubjects}
                  deleteSubject={() => handleDelete(subject)}
                />
              </Grid>
            )
          })}
          {isAdmin ? (
            <Grid item>
              <NewSubjectCard addSubject={addSubject} addImage={addImage} getSubjects={getSubjects} />
            </Grid>
          ) : null}
        </Grid>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Category

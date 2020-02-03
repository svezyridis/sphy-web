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
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import HomeIcon from '@material-ui/icons/Home'
import { objectToQueryString } from '../../general/helperFunctions'
import { baseURL } from '../../general/constants'
import EventSeatIcon from '@material-ui/icons/EventSeat'
import LoadingDialog from '../quiz/LoadingDialog'
import UserTestCard from './UserTestCard'
import find from 'lodash.find'

const testsURL = baseURL + 'tests'
const classesURL = baseURL + 'classes/'

const UserTests = ({
  open,
  toogleDrawer,
  account,
  deleteAccount,
  dark,
  history,
  tests,
  addOrUpdateTest
}) => {
  const classes = homeStyle()
  const [error, setError] = useState('')
  const [reason, setReason] = useState('')
  const controller = new window.AbortController()
  const signal = controller.signal

  const getTests = (classroom) => {
    const classID = classroom.id
    const queryParams = objectToQueryString({ classID: classID })
    setReason('Λήψη διαγωνισμάτων')
    fetch(testsURL + queryParams, {
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
        setReason('')
        if (status === 'error') {
          setError(message)
        } else {
          const tests = result.map(test => ({ ...test, classroom }))
          tests.forEach(test => {
            addOrUpdateTest(account.metadata.username, test)
          })
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
    if (isEmpty(account)) { return }
    setReason('Λήψη τάξεων')
    fetch(classesURL, {
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
        setReason('')
        if (status === 'error') {
          setError(message)
        } else {
          result.forEach(classroom => {
            getTests(classroom)
          })
        }
      })
      .catch(error => {
        setReason('')
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
  const username = account.metadata.username
  let classTests = find(tests, { username: username })
  classTests = classTests ? classTests.tests : []
  const userTests = classTests.filter(test => {
    const dateUserEnteredClass = find(test.classroom.students, { username: username }).timeAdded
    console.log(dateUserEnteredClass)
    const testCreationTime = test.creationTime
    console.log(testCreationTime)
    console.log()
    return Date.parse(testCreationTime) > Date.parse(dateUserEnteredClass)
  })
  console.log(userTests)

  return (
    <div className={classes.root}>
      <LoadingDialog reason={reason} open={reason !== ''} />
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
              history.push('/classes')
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            <EventSeatIcon className={classes.icon} />
            Τα διαγωνίσματά μου
          </Link>
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary' align='center'>
          Τα διαγωνίσματά μου
        </Typography>
        <Grid
          container
          alignItems='center'
          justify='center'
          spacing={5}
          className={classes.grid}
        >
          {userTests.map((test, index) => {
            return (
              <Grid key={index} item>
                <UserTestCard test={test} onUpdate={getTests} />
              </Grid>
            )
          })}
        </Grid>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default UserTests

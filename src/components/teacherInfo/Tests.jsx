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
import TestCard from './TestCard'
import EventSeatIcon from '@material-ui/icons/EventSeat'
import { Tooltip, Fab, IconButton } from '@material-ui/core'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import CreateTestDialog from './CreateTestDialog'

const testsURL = baseURL + 'tests'

const Tests = ({
  open,
  toogleDrawer,
  account,
  deleteAccount,
  dark,
  match,
  history,
  location
}) => {
  const classes = homeStyle()
  const [error, setError] = useState('')
  const [tests, setTests] = useState([])
  const [createTestDialogOpen, setCreateTestDialogOpen] = useState(false)
  const controller = new window.AbortController()
  const signal = controller.signal
  const className = match.params.className

  const deleteTest = test => {
    console.log(test)
  }

  const getTests = () => {
    console.log(location.state)
    const classID = location.state.classroom.id
    const queryParams = objectToQueryString({ classID: classID })
    fetch(testsURL + queryParams, {
      method: 'GET',
      credentials: 'include',
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error' || status === 500 || status === 400) { setError(message) } else {
          setTests(result)
        }
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }

  const createTest = (name, duration, noOfQuestions, categories) => {
    console.log(name, duration, noOfQuestions)
    console.log(categories)
    const classID = location.state.classroom.id
    const test = { name, duration, classID }
    const categoryIDs = categories.map(category => category.id)
    const newTest = { test, noOfQuestions, categoryIDs }
    fetch(testsURL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      signal: signal,
      body: JSON.stringify(newTest)
    })
      .then(response => {
        if (response.ok) return response.json()
        else throw Error(`Request rejected with status ${response.status}`)
      })
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error') { setError(message) } else {
          getTests()
        }
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }

  useEffect(() => {
    if (!location.state) {
      return
    }
    getTests()
    return () => {
      controller.abort()
    }
  }, [])

  if (isEmpty(account)) {
    history.push('/login')
    return null
  }
  if (!location.state) {
    history.push('/classes')
    return null
  }

  return (
    <div className={classes.root}>
      <CreateTestDialog
        open={createTestDialogOpen}
        onClose={() => setCreateTestDialogOpen(false)}
        onCreate={createTest}
        classes={classes}
      />
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
            Οι τάξεις μου
          </Link>
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary' align='center'>
          {className}
        </Typography>
        <Grid
          container
          alignItems='center'
          justify='center'
          spacing={5}
          className={classes.grid}
        >
          {tests.map((test, index) => {
            return (
              <Grid key={index} item>
                <TestCard test={test} onUpdate={getTests} />
              </Grid>
            )
          })}
          <Grid item>
            <Tooltip title='Δημιουργία νέου τεστ'>
              <Fab
                size='large'
                color='secondary'
                onClick={() => setCreateTestDialogOpen(true)}
              >
                <AddCircleOutlineRoundedIcon fontSize='large' />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Tests

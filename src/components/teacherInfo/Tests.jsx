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
import { Tooltip, Fab } from '@material-ui/core'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import CreateTestDialog from './CreateTestDialog'
import LoadingDialog from '../quiz/LoadingDialog'
import DetailsDialog from './DetailsDIalog'

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
  const [testToShow, setTestToShow] = useState(null)
  const [reason, setReason] = useState('')
  const controller = new window.AbortController()
  const signal = controller.signal
  const className = match.params.className
  const [detailsOpen, setDetailsOpen] = useState(false)

  const getTests = () => {
    const classID = location.state.classroom.id
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
          setTests(result)
        }
      })
      .catch(error => {
        setReason('')
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }

  const updateTest = (test) => {
    const controller = new window.AbortController()
    const signal = controller.signal
    setReason('Ενημέρωση διαγωνίσματος')
    fetch(testsURL + '/' + test.id, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(test),
      signal: signal
    })
      .then(response => {
        if (response.ok) { return response.json() } else throw Error(`Request rejected with status ${response.status}`)
      })
      .then(data => {
        const { status, message } = data
        setReason('')
        if (status === 'error') {
          console.log(message)
        } else {
          getTests()
        }
      })
      .catch(error => {
        setReason('')
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
    console.log(test)
  }

  const deleteTest = (test) => {
    const controller = new window.AbortController()
    const signal = controller.signal
    fetch(testsURL + '/' + test.id, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      signal: signal
    })
      .then(response => {
        if (response.ok) { return response.json() } else throw Error(`Request rejected with status ${response.status}`)
      })
      .then(data => {
        const { status, message } = data
        console.log(data)
        setReason('')
        if (status === 'error') {
          console.log(message)
        } else {
          getTests()
        }
      })
      .catch(error => {
        setReason('')
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
    console.log(test)
  }

  const createTest = (name, duration, noOfQuestions, categories) => {
    setCreateTestDialogOpen(false)
    setReason('Δημιουργία διαγωνίσματος')
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
        setReason('')
        const { status, message } = data
        console.log(data)
        if (status === 'error') { setError(message) } else {
          getTests()
        }
      })
      .catch(error => {
        setReason('')
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }

  const openDetails = (test) => {
    setTestToShow(test)
    setDetailsOpen(true)
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
      <LoadingDialog reason={reason} open={reason !== ''} />
      <CreateTestDialog
        open={createTestDialogOpen}
        onClose={() => setCreateTestDialogOpen(false)}
        onCreate={createTest}
        classes={classes}
      />

      <DetailsDialog open={detailsOpen} onClose={() => setDetailsOpen(false)} classroom={location.state.classroom} test={testToShow} />
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
                <TestCard test={test} onUpdate={getTests} updateTest={updateTest} deleteTest={deleteTest} openDetails={(test) => openDetails(test)} />
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

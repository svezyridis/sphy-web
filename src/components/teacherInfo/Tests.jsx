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
import { titleCase, getBranchName } from '../../general/helperFunctions'
import { baseURL } from '../../general/constants'
import TestCard from './TestCard'
import EventSeatIcon from '@material-ui/icons/EventSeat'

const testsURL = baseURL + 'test/'

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
  const branch = match.params.weapon
  const category = match.params.category
  const controller = new window.AbortController()
  const signal = controller.signal

  const deleteTest = test => {
    console.log(test)
  }

  useEffect(() => {
    if (isEmpty(account)) {
      return
    }
    fetch(testsURL, {
      method: 'GET',
      credentials: 'include',
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error' || status === 500) setError(message)
        else {
          setTests(result)
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
          {tests.map((test, index) => {
            return (
              <Grid key={index} item>
                <TestCard
                  test={test}
                  branch={branch}
                  admin={isAdmin}
                  category={category}
                  deleteTest={() => deleteTest(test)}
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
export default Tests

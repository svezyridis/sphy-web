import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import uniqWith from 'lodash.uniqwith'
import classNames from 'classnames'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { Tooltip, IconButton, Fab } from '@material-ui/core'
import timestamp from 'time-stamp'
import { fetch } from 'whatwg-fetch'
import { baseURL } from '../../general/constants'
import TimerOffIcon from '@material-ui/icons/TimerOff'

const testsURL = baseURL + 'tests/'

const useStyles = makeStyles({
  card: {
    minWidth: 230
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 16
  },
  pos: {
    marginBottom: 12
  },
  fab: {
    marginLeft: 'auto'
  },
  active: {
    color: 'darkgreen'
  },
  complete: {
    color: 'darkred'
  }
})

const updateTest = (test, onUpdateSuccess, onUpdateFailure) => {
  console.log(JSON.stringify(test))
  const controller = new window.AbortController()
  const signal = controller.signal
  fetch(testsURL + test.id, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(test),
    signal: signal
  })
    .then(response => response.json())
    .then(data => {
      const { status, result, message } = data
      console.log(data)
      if (status === 'error' || status === 500 || status === 400) {
        onUpdateFailure(message)
      } else {
        onUpdateSuccess()
      }
    })
    .catch(error => {
      if (!controller.signal.aborted) {
        console.error(error)
      }
    })
  console.log(test)
}

const activationButton = (test, classes, onUpdate) => (
  <div className={classes.fab}>
    <Tooltip title='Ενεργοποίηση διαγωνίσματος'>
      <Fab
        size='small'
        onClick={() =>
          updateTest(
            { ...test, activationTime: timestamp('YYYY-MM-DD HH:mm') },
            onUpdate,
            err => console.log(err)
          )
        }
      >
        <PlayArrowIcon />
      </Fab>
    </Tooltip>
  </div>
)

const completionButton = (test, classes, onUpdate) => (
  <div className={classes.fab}>
    <Tooltip title='Ολοκλήρωση διαγωνίσματος'>
      <Fab
        size='small'
        onClick={() =>
          updateTest(
            { ...test, completionTime: timestamp('YYYY-MM-DD HH:mm') },
            onUpdate,
            err => console.log(err)
          )
        }
      >
        <TimerOffIcon />
      </Fab>
    </Tooltip>
  </div>
)

const TestCard = ({ test, onUpdate }) => {
  const classes = useStyles()
  const status = test.activationTime
    ? test.completionTime
      ? 'Ολκληρωμένο'
      : 'Ενεργό'
    : 'Ανενεργό'
  const isActive = status === 'Ενεργό'
  const isComplete = status === 'Ολκληρωμένο'
  const isInactive = status === 'Ανενεργό'
  return (
    <Card className={classes.card} elevation={5}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {'Κατάσταση: '}
          <span
            className={classNames(
              classes.inActive,
              isComplete && classes.complete,
              isActive && classes.active
            )}
          >
            {status}
          </span>
        </Typography>
        <Typography variant='h5' component='h2'>
          {test.name}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {`Δημιουργήθηκε: ${test.creationDate}`}
        </Typography>
        <Typography variant='body2' component='p'>
          {`Αριθμός ερωτήσεων: ${test.questions.length}`}
          <br />
          {`Υποβληθήσες απαντήσεις: ${
            uniqWith(
              test.answers,
              (answer1, answer2) => answer1.userID === answer2.userID
            ).length
          }`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size='small'>Περισσοτερα</Button>
        {isInactive ? activationButton(test, classes, onUpdate) : null}
        {isActive ? completionButton(test, classes, onUpdate) : null}
      </CardActions>
    </Card>
  )
}

export default TestCard

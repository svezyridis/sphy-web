import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { Tooltip, Fab } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import AssessmentIcon from '@material-ui/icons/Assessment'

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
    fontSize: 16,
    float: 'left'
  },
  fab: {
    position: 'relative',
    top: -8,
    marginLeft: 'auto'
  },
  pos: {
    marginBottom: 12
  },
  delete: {
    marginLeft: 'auto'
  },
  active: {
    color: 'darkgreen'
  },
  complete: {
    color: 'darkred'
  }
})

const startButton = (onClick, classes) => {
  return (
    <div className={classes.fab}>
      <Tooltip title='Εκκίνηση'>
        <Fab size='small' onClick={onClick}>
          <PlayArrowIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}

const resumeButton = (onClick, classes) => (
  <div className={classes.fab}>
    <Tooltip title='Συνέχεια'>
      <Fab size='small' onClick={onClick}>
        <ArrowForwardIcon />
      </Fab>
    </Tooltip>
  </div>
)

const reviewButton = (onClick, classes) => (
  <div className={classes.fab}>
    <Tooltip title='Επισκόπηση'>
      <Fab size='small' onClick={onClick}>
        <AssessmentIcon />
      </Fab>
    </Tooltip>
  </div>
)

const UserTestCard = ({
  test,
  openDetails,
  onStart,
  onResume,
  expireTest,
  onReview
}) => {
  const classes = useStyles()
  const status = test.activationTime
    ? test.completionTime
      ? 'Ολοκληρωμένο'
      : 'Ενεργό'
    : 'Ανενεργό'
  const isActive = status === 'Ενεργό'
  const isComplete = status === 'Ολοκληρωμένο'
  const isInactive = status === 'Ανενεργό'
  const [remainingTime, setRemainingTime] = useState(null)
  useEffect(() => {
    if (test.finished) return
    const interval = setInterval(() => {
      if (!test.startedAt || !test.activationTime) {
        setRemainingTime(null)
        return
      }
      const timePassed = Math.floor(
        (Date.now() - Date.parse(test.startedAt)) / 1000
      )
      const duration = test.duration * 60
      const remainder = duration - timePassed
      if (remainder < 0) {
        setRemainingTime('Τέλος χρόνου')
        expireTest(test)
      }
      const seconds = remainder % 60
      const minutes = Math.floor(remainder / 60)
      setRemainingTime(`Yπόλοιπο: ${minutes}:${seconds}`)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Card className={classes.card} elevation={5}>
      <CardContent>
        <div style={{ display: 'flex' }}>
          <Typography
            className={classes.title}
            color='textSecondary'
            component='div'
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
        </div>
        <Typography variant='h5' component='h2'>
          {test.name}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {`Δημιουργήθηκε: ${test.creationTime.substring(0, 10)}`}
          <br />
          {isActive ? `Ενεργό από: ${test.activationTime}` : null}
        </Typography>
        <Typography variant='body2' component='p'>
          {`Τάξη: ${test.classroom.name}`}
          <br />
          {`Σκορ: ${test.score}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {remainingTime}
        {isActive
          ? test.startedAt
            ? test.finished
              ? reviewButton(() => onReview(test), classes)
              : resumeButton(() => onResume(test), classes)
            : startButton(() => onStart(test), classes)
          : null}
        {isComplete ? reviewButton(() => onReview(test), classes) : null}
      </CardActions>
    </Card>
  )
}

export default UserTestCard

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { Tooltip, Fab } from '@material-ui/core'
import TimerOffIcon from '@material-ui/icons/TimerOff'

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
      <Tooltip title='Ενεργοποίηση διαγωνίσματος'>
        <Fab
          size='small'
          onClick={onClick}
        >
          <PlayArrowIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}

const resumeButton = (onClick, classes) => (
  <div className={classes.fab}>
    <Tooltip title='Ολοκλήρωση διαγωνίσματος'>
      <Fab
        size='small'
        onClick={onClick}
      >
        <TimerOffIcon />
      </Fab>
    </Tooltip>
  </div>
)

const UserTestCard = ({ test, openDetails }) => {
  const classes = useStyles()
  const status = test.activationTime
    ? test.completionTime
      ? 'Ολοκληρωμένο'
      : 'Ενεργό'
    : 'Ανενεργό'
  const isActive = status === 'Ενεργό'
  const isComplete = status === 'Ολοκληρωμένο'
  const isInactive = status === 'Ανενεργό'

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
        </Typography>
        <Typography variant='body2' component='p'>
          {`Τάξη: ${test.class}`}
          <br />
          {`Σκορ: ${test.score}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        actions
      </CardActions>
    </Card>
  )
}

export default UserTestCard

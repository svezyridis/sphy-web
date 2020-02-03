import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import uniqWith from 'lodash.uniqwith'
import classNames from 'classnames'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { Tooltip, Fab, CardHeader } from '@material-ui/core'
import timestamp from 'time-stamp'
import { fetch } from 'whatwg-fetch'
import { baseURL } from '../../general/constants'
import TimerOffIcon from '@material-ui/icons/TimerOff'
import LoadingDialog from '../quiz/LoadingDialog'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteTestDialog from './DeleteTestDIalog'

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

const activationButton = (onClick, classes) => {
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
const deleteButton = (onClick, classes) => (
  <div className={classes.delete}>
    <Tooltip title='Διαγραφή διαγωνίσματος'>
      <Fab
        size='small'
        onClick={onClick}
      >
        <DeleteIcon />
      </Fab>
    </Tooltip>
  </div>
)

const completionButton = (onClick, classes) => (
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

const TestCard = ({ test, updateTest, deleteTest, openDetails }) => {
  const classes = useStyles()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const status = test.activationTime
    ? test.completionTime
      ? 'Ολοκληρωμένο'
      : 'Ενεργό'
    : 'Ανενεργό'
  const isActive = status === 'Ενεργό'
  const isComplete = status === 'Ολοκληρωμένο'
  const isInactive = status === 'Ανενεργό'
  const onComplete = () => updateTest({ ...test, completionTime: timestamp('YYYY-MM-DD HH:mm') })
  const onActivate = () => updateTest({ ...test, activationTime: timestamp('YYYY-MM-DD HH:mm') })
  const onDelete = () => setDeleteDialogOpen(true)

  return (
    <>
      <DeleteTestDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDeleteTest={() => {
          setDeleteDialogOpen(false)
          deleteTest(test)
        }}
      />
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
            {isInactive ? activationButton(onActivate, classes) : isActive ? completionButton(onComplete, classes) : null}
          </div>
          <Typography variant='h5' component='h2'>
            {test.name}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {`Δημιουργήθηκε: ${test.creationTime.substring(0, 10)}`}
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
          <Button size='small' onClick={() => openDetails(test)}>Περισσοτερα</Button>
          {deleteButton(onDelete, classes)}
        </CardActions>
      </Card>
    </>
  )
}

export default TestCard

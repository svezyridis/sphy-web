import React from 'react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Typography from '@material-ui/core/Typography'
import { titleCase } from '../../general/helperFunctions'
import { MainListItems } from './AdminListItems'
import { Button, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toogleDrawer } from '../../store/actions'
import find from 'lodash.find'

const AdminDrawer = ({
  account,
  deleteAccount,
  classes,
  onQuizStart,
  onQuestionClick,
  onReviewQuestionClick,
  quiz
}) => {
  const { firstName, lastName } = account.metadata
  const history = useHistory()
  const open = useSelector(state => state.open)
  const dispatch = useDispatch()
  const logout = () => {
    deleteAccount()
    history.push('/login')
    return null
  }

  const setOpen = open => dispatch(toogleDrawer(open))
  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: classNames(classes.paper, !open && classes.paperClose)
      }}
      open={open}
      anchor='right'
    >
      <IconButton
        onClick={() => setOpen(false)}
        className={classes.toolbarIcon}
        color='inherit'
      >
        <ChevronRightIcon />
        <Typography variant='h4'>
          {titleCase(`${firstName} ${lastName}`)}
        </Typography>
      </IconButton>
      <Divider />
      <MainListItems />
      {onReviewQuestionClick && open ? (
        <>
          <Divider />
          <Grid
            container
            spacing={2}
            className={classes.questionButtonGrid}
            justify='space-evenly'
          >
            {quiz.questions.map((question, index) => {
              const answer = find(quiz.answers, { questionID: question.id })
              const selectedOption = find(question.optionList, {
                id: parseInt(answer.optionID)
              })
              const correct = selectedOption && selectedOption.correct
              return (
                <Grid item key={index}>
                  <Button
                    className={classNames(
                      classes.questionBox,
                      correct && classes.questionBoxAnswered
                    )}
                    onClick={() => history.push(`/review/${index + 1}`)}
                  >
                    <Typography align='center'>{index + 1}</Typography>
                  </Button>
                </Grid>
              )
            })}
          </Grid>
          <Divider />
        </>
      ) : null}
      {onQuestionClick && open ? (
        <>
          <Divider />
          <Grid
            container
            spacing={2}
            className={classes.questionButtonGrid}
            justify='space-evenly'
          >
            {quiz.questions.map((question, index) => {
              return (
                <Grid item key={index}>
                  <Button
                    className={classNames(
                      classes.questionBox,
                      find(quiz.answers, { questionID: question.id })
                        .optionID !== '-1' && classes.questionBoxAnswered
                    )}
                    onClick={() => history.push(`/question/${index + 1}`)}
                  >
                    <Typography align='center'>{index + 1}</Typography>
                  </Button>
                </Grid>
              )
            })}
          </Grid>
          <Divider />
          <Button
            variant='contained'
            className={classNames(classes.logout, classes.button)}
            onClick={() => history.push('/review/1')}
          >
            ΥΠΟΒΟΛΗ
          </Button>
        </>
      ) : null}
      {onQuizStart && open ? (
        <div>
          <Divider />
          <Button
            variant='contained'
            className={classNames(classes.logout, classes.button)}
            onClick={onQuizStart}
          >
            ΔΗΜΙΟΥΡΓΙΑ QUIZ
          </Button>
        </div>
      ) : null}
      <Divider />
      {open ? (
        <Button
          variant='contained'
          className={classNames(classes.logout, classes.button)}
          onClick={logout}
        >
          ΕΞΟΔΟΣ
        </Button>
      ) : null}
    </Drawer>
  )
}

export default AdminDrawer

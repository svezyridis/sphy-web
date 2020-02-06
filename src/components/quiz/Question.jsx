import React, { useState, useEffect } from 'react'
import DefaultAppBar from '../DefaultAppBar'
import Copyright from '../Copyright'
import homeStyle from '../../styles/homeStyle'
import classNames from 'classnames'
import HomeDrawer from '../home/HomeDrawer'
import Link from '@material-ui/core/Link'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import HomeIcon from '@material-ui/icons/Home'
import isEmpty from 'lodash.isempty'
import find from 'lodash.find'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Fab from '@material-ui/core/Fab'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'
import QuestionCard from './QuestionCard'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

const Question = ({
  dark,
  open,
  toogleDrawer,
  account,
  deleteAccount,
  selectOption,
  onSubmitQuiz,
  quizes,
  history,
  match
}) => {
  const classes = homeStyle()
  const questionIndex = match.params.questionIndex - 1
  const [time, setTime] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!myQuiz) {
        setTime(null)
        return
      }
      const timePassed = Math.floor(
        (Date.now() - Date.parse(myQuiz.startedAt)) / 1000
      )
      const seconds = timePassed % 60
      const minutes = Math.floor(timePassed / 60)
      setTime(`Χρόνος: ${minutes}:${seconds}`)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  if (isEmpty(account)) {
    history.push('/login')
    return null
  }
  const username = account.metadata.username
  const myQuiz = find(quizes, { username: username })

  if (!myQuiz) {
    history.push('/quiz')
    return null
  }
  const question = myQuiz.questions[questionIndex]

  if (questionIndex > myQuiz.questions.length - 1 || questionIndex < 0) {
    history.push('/question/1')
    return null
  }
  const answer = find(myQuiz.myAnswers, { questionID: question.id })

  const handleRight = () => {
    console.log('right')
    history.push(`/question/${parseInt(questionIndex + 1) + 1}`)
  }

  const handleLeft = () =>
    history.push(`/question/${parseInt(questionIndex + 1) - 1}`)

  const onQuestionClick = index => history.push(`/question/${index + 1}`)
  const submitQuiz = () => {
    onSubmitQuiz(username)
    history.push('/review/1')
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
        onQuestionClick={onQuestionClick}
        quiz={myQuiz}
        onSubmit={submitQuiz}
      />
      <div className={classNames(classes.rest, !open && classes.closed)}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
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
            className={classNames(classes.link, dark && classes.dark)}
            onClick={() => {
              history.push('/quiz')
            }}
          >
            <FormatListNumberedIcon className={classes.icon} />
            Αυτοαξιολόγηση
          </Link>
          <Link
            component='button'
            variant='body1'
            className={classNames(classes.link, dark && classes.dark)}
          >
            <FormatListNumberedIcon className={classes.icon} />
            Ερωτηματολόγιο
          </Link>
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary' align='center'>
          Αυτοαξιολόγηση
        </Typography>
        <Typography align='center'>{time}</Typography>
        <Grid
          container
          className={classes.questionGrid}
          alignItems='center'
          wrap='nowrap'
          justify='center'
        >
          <Grid item>
            <Fab color={dark ? 'secondary' : 'primary'} onClick={handleLeft}>
              <ChevronLeftRoundedIcon />
            </Fab>
          </Grid>
          <Grid item xs={12}>
            <QuestionCard
              classes={classes}
              setOption={option => selectOption(username, question.id, option)}
              question={question}
              dark={dark}
              answer={answer}
              finished={myQuiz.finished}
            />
          </Grid>
          <Grid item>
            <Fab color='secondary' onClick={handleRight}>
              <ChevronRightRoundedIcon />
            </Fab>
          </Grid>
        </Grid>
        <Typography variant='subtitle1' align='center'>
          {`Ερώτηση ${parseInt(questionIndex) + 1} από ${
            myQuiz.questions.length
          }`}
        </Typography>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Question

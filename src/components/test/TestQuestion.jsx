import React, { useState, useEffect, useMemo } from 'react'
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
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import QuestionCard from '../quiz/QuestionCard'
import { fetch } from 'whatwg-fetch'
import { baseURL } from '../../general/constants'
import LoadingDialog from '../quiz/LoadingDialog'

const testsURL = baseURL + 'tests/'

const TestQuestion = ({
  dark,
  open,
  toogleDrawer,
  account,
  deleteAccount,
  addOrUpdateTest,
  selectOption,
  onSubmitTest,
  tests,
  history,
  match
}) => {
  const classes = homeStyle()
  const controller = new window.AbortController()
  const signal = controller.signal
  const [remainingTime, setRemainingTime] = useState(null)
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      if (!myTest || !myTest.startedAt || !myTest.activationTime) {
        setRemainingTime(null)
        return
      }
      const timePassed = Math.floor(
        (Date.now() - Date.parse(myTest.startedAt)) / 1000
      )
      const duration = myTest.duration * 60
      const remainder = duration - timePassed
      if (remainder < 0) {
        setRemainingTime('Τέλος χρόνου')
        if (!myTest.finished) {
          onSubmitTest(username, parseInt(testID))
        }
      }
      const seconds = remainder % 60
      const minutes = Math.floor(remainder / 60)
      setRemainingTime(`Yπόλοιπο: ${minutes}:${seconds}`)
    }, 1000)
    return () => {
      clearInterval(interval)
      controller.abort()
    }
  }, [])

  if (isEmpty(account)) {
    history.push('/login')
    return null
  }
  const questionIndex = match.params.questionIndex - 1
  const testID = match.params.testID
  const username = account.metadata.username
  const myTests = find(tests, { username: username })

  if (isEmpty(myTests)) {
    history.push('/tests')
    return null
  }
  const myTest = find(myTests.tests, { id: parseInt(testID) })
  if (!myTest) {
    history.push('/tests')
    return null
  }
  if (questionIndex > myTest.questions.length - 1 || questionIndex < 0) {
    history.push(`/test/${testID}/1`)
    return null
  }
  const question = myTest.questions[questionIndex]
  const answer = find(myTest.myAnswers, { questionID: question.id })

  const handleRight = () => {
    console.log('right')
    history.push(`/test/${testID}/${parseInt(questionIndex + 1) + 1}`)
  }

  const handleLeft = () =>
    history.push(`/test/${testID}/${parseInt(questionIndex + 1) - 1}`)

  const onQuestionClick = index => history.push(`/test/${testID}/${index + 1}`)

  const submit = () => {
    const answers = myTest.myAnswers.map(answer => ({
      questionID: find(myTest.questions, { id: answer.questionID })
        .testQuestionID,
      choiceID:
        parseInt(answer.optionID) === -1 ? null : parseInt(answer.optionID)
    }))
    fetch(testsURL + testID, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(answers),
      signal: signal
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else throw Error(`Request rejected with status ${response.status}`)
      })
      .then(data => {
        console.log(data)
        const { status, result, message } = data
        if (status === 'success') {
          onSubmitTest(username, parseInt(testID))
          history.push('/tests')
        }
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }

  return (
    <div className={classes.root}>
      <LoadingDialog open={reason !== ''} reason={reason} />
      <DefaultAppBar open={open} onClick={toogleDrawer} classes={classes} />
      <HomeDrawer
        open={open}
        setOpen={toogleDrawer}
        account={account}
        deleteAccount={deleteAccount}
        classes={classes}
        onQuestionClick={onQuestionClick}
        quiz={myTest}
        onSubmit={submit}
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
          >
            <FormatListNumberedIcon className={classes.icon} />
            Quiz
          </Link>
        </Breadcrumbs>
        <Typography align='center'>{remainingTime}</Typography>
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
              setOption={option =>
                selectOption(username, myTest.id, question.id, option)
              }
              question={question}
              dark={dark}
              answer={answer}
              finished={myTest.finished}
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
            myTest.questions.length
          }`}
        </Typography>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default TestQuestion

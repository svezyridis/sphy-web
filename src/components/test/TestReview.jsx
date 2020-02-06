import React, { useMemo } from 'react'
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
import ReviewCard from '../quiz/ReviewCard'
import intersectionWith from 'lodash.intersectionwith'
import isEqual from 'lodash.isequal'

const TestReview = ({
  dark,
  open,
  toogleDrawer,
  account,
  deleteAccount,
  tests,
  history,
  match
}) => {
  const classes = homeStyle()
  const questionIndex = match.params.questionIndex - 1

  if (isEmpty(account)) {
    history.push('/login')
    return null
  }
  const username = account.metadata.username
  const myTests = find(tests, { username: username })
  const testID = match.params.testID

  if (isEmpty(myTests)) {
    history.push('/tests')
    return null
  }
  const myTest = find(myTests.tests, { id: parseInt(testID) })
  if (!myTest) {
    history.push('/tests')
    return null
  }
  if (questionIndex < 0 || questionIndex >= myTest.questions.length) {
    history.push(`/reviewtest/${testID}/1`)
    return null
  }

  const userID = account.metadata.id
  const questionsWithCorrectAnswer = myTest.questions.map(question => ({
    questionID: question.id,
    optionID: find(question.optionList, { correct: true }).id
  }))
  const userAnswers = myTest.answers
    .filter(answer => answer.userID === userID)
    .map(answer => ({
      questionID: answer.questionID,
      optionID: answer.choiceID
    }))
  const correctUserAnswers = intersectionWith(
    questionsWithCorrectAnswer,
    userAnswers,
    isEqual
  )
  const score =
    userAnswers.length > 0
      ? ((correctUserAnswers.length / myTest.questions.length) * 100).toFixed(1)
      : -1
  console.log(myTest)
  console.log(userID)
  const question = myTest.questions[questionIndex]
  let answer = find(userAnswers, { questionID: question.id })
  answer = { ...answer, optionID: answer.optionID.toString() }

  const handleRight = () => {
    console.log('right')
    history.push(`/reviewtest/${testID}/${parseInt(questionIndex + 1) + 1}`)
  }

  const handleLeft = () =>
    history.push(`/reviewtest/${testID}/${parseInt(questionIndex + 1) - 1}`)

  const onQuestionClick = index =>
    history.push(`/reviewtest/${testID}/${index + 1}`)

  return (
    <div className={classes.root}>
      <DefaultAppBar open={open} onClick={toogleDrawer} classes={classes} />
      <HomeDrawer
        open={open}
        setOpen={toogleDrawer}
        account={account}
        deleteAccount={deleteAccount}
        classes={classes}
        onReviewQuestionClick={onQuestionClick}
        quiz={{
          ...myTest,
          myAnswers: userAnswers.map(answer => ({
            ...answer,
            optionID: answer.optionID.toString()
          }))
        }}
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
            Επισκόπηση
          </Link>
        </Breadcrumbs>
        <Typography variant='h4' align='center'>
          {`Η βαθμολογία σας είναι:
          `}
        </Typography>
        <Typography
          variant='h3'
          align='center'
          className={score > 50 ? classes.correct : classes.incorrect}
        >
          {' '}
          {score >= 0 ? score + '%' : '-'}
        </Typography>
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
            <ReviewCard
              classes={classes}
              question={question}
              dark={dark}
              answer={answer}
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
export default TestReview

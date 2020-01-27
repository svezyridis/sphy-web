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
import { baseURL } from '../../general/constants'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import ReviewCard from './ReviewCard'

const imagesURL = baseURL + 'image/'

const Review = ({
  dark,
  open,
  toogleDrawer,
  account,
  deleteAccount,
  addQuestionImage,
  selectOption,
  quizes,
  history,
  match
}) => {
  const classes = homeStyle()
  const questionIndex = match.params.questionIndex - 1
  const username = account.metadata.username
  const [image, setImage] = useState(null)
  const myQuiz = find(quizes, { username: username })

  const getImagesOfQuestion = question => {
    const branch = question.branch
    const category = question.category
    const subject = question.subject.uri
    var imageUrl =
      imagesURL +
      branch +
      '/' +
      category +
      '/' +
      subject +
      '/' +
      question.image.filename
    addQuestionImage(username, question.id, imageUrl)
    setImage(imageUrl)
  }

  const question = myQuiz.questions[questionIndex]

  useEffect(() => {
    if (!myQuiz) return
    if (!question) return
    getImagesOfQuestion(question)
    return () => {}
  }, [question])

  if (!myQuiz) {
    history.push('/quiz')
    return null
  }

  if (questionIndex < 0 || questionIndex >= myQuiz.questions.length) {
    history.push('/review/1')
    return null
  }

  const answer = find(myQuiz.answers, { questionID: question.id })
  const score = myQuiz.answers.reduce((accumulator, answer) => {
    const question = find(myQuiz.questions, { id: answer.questionID })
    const selectedOption = find(question.optionList, {
      id: parseInt(answer.optionID)
    })
    const increment = selectedOption && selectedOption.correct ? 1 : 0
    return accumulator + increment
  }, 0)

  if (isEmpty(account)) {
    console.log('account is empty')
    var tempAccount = window.sessionStorage.getItem('account')
    if (isEmpty(tempAccount)) {
      history.push('/login')
      return null
    }
  }
  if (questionIndex > myQuiz.questions.length - 1 || questionIndex < 0) {
    history.push('/review/1')
    return null
  }

  const handleRight = () => {
    console.log('right')
    history.push(`/review/${parseInt(questionIndex + 1) + 1}`)
  }

  const handleLeft = () =>
    history.push(`/review/${parseInt(questionIndex + 1) - 1}`)

  const onQuestionClick = id => console.log(id)

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
        quiz={myQuiz}
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
          <h3
            className={
              (score / myQuiz.questions.length).toFixed(2) * 100 > 50
                ? classes.correct
                : classes.incorrect
            }
          >
            {`${(parseFloat(score / myQuiz.questions.length) * 100).toFixed(
              1
            )} %`}
          </h3>
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
              setOption={option => selectOption(username, question.id, option)}
              question={question}
              dark={dark}
              image={image}
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
            myQuiz.questions.length
          }`}
        </Typography>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Review

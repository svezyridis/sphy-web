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
import { baseURL } from '../../general/constants'
import { fetch } from 'whatwg-fetch'

const imagesURL = baseURL + 'image/'

const Question = ({
  dark,
  open,
  toogleDrawer,
  account,
  deleteAccount,
  addImage,
  quizes,
  history,
  match
}) => {
  const classes = homeStyle()
  const questionIndex = match.params.questionIndex
  const username = account.metadata.username
  const [image, setImage] = useState(null)
  const myQuiz = find(quizes, { username: username })
  var controller = new window.AbortController()
  var signal = controller.signal

  const getImagesOfQuestion = question => {
    console.log(question)
    const branch = question.branch
    const category = question.category
    const subject = question.subject.uri
    fetch(
      imagesURL +
        branch +
        '/' +
        category +
        '/' +
        subject +
        '/' +
        question.image.filename,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          authorization: 'Bearer ' + account.token
        },
        signal: signal
      }
    )
      .then(response => response.blob())
      .then(imageFile => {
        var imageUrl = URL.createObjectURL(imageFile)
        console.log(imageUrl)
        addImage(username, question.id, imageUrl)
        setImage(imageUrl)
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }
  const question = myQuiz.questions[questionIndex]
  if (isEmpty(account)) {
    console.log('account is empty')
    var tempAccount = window.sessionStorage.getItem('account')
    if (isEmpty(tempAccount)) {
      history.push('/login')
    }
  }
  useEffect(() => {
    if (!myQuiz) return
    console.log('i am running')
    getImagesOfQuestion(question)
    return () => {}
  }, [question])

  if (!myQuiz) {
    history.push('/quiz')
    return null
  }
  if (questionIndex > myQuiz.questions.length - 1) {
    history.push('/question/1')
    return null
  }

  const handleRight = () =>
    history.push(`/question/${parseInt(questionIndex) + 1}`)
  const handleLeft = () =>
    history.push(`/question/${parseInt(questionIndex) - 1}`)

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
        onQuestionClick={onQuestionClick}
        questions={myQuiz.questions}
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
            Home
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
        <Fab
          color={dark ? 'secondary' : 'primary'}
          className={classes.leftIcon}
          onClick={handleLeft}
        >
          <ChevronLeftRoundedIcon />
        </Fab>
        <Fab
          color={dark ? 'secondary' : 'primary'}
          className={classes.rightIcon}
          onClick={handleRight}
        >
          <ChevronRightRoundedIcon />
        </Fab>
        <QuestionCard
          classes={classes}
          setOption={option => console.log(option)}
          question={question}
          dark={dark}
          image={image}
        />
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Question

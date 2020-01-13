import React, { useState } from 'react'
import DefaultAppBar from '../DefaultAppBar'
import Copyright from '../Copyright'
import homeStyle from '../../styles/homeStyle'
import classNames from 'classnames'
import HomeDrawer from '../home/HomeDrawer'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import HomeIcon from '@material-ui/icons/Home'
import isEmpty from 'lodash.isempty'
import find from 'lodash.find'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Paper from '@material-ui/core/Paper'

const Question = ({
  dark,
  open,
  toogleDrawer,
  account,
  deleteAccount,
  quizes,
  history,
  match
}) => {
  const classes = homeStyle()
  const questionIndex = match.params.questionIndex
  const username = account.metadata.username
  const myQuiz = find(quizes, { username: username })
  const [option, setOption] = useState(-1)
  if (!myQuiz) {
    history.push('/quiz')
    return null
  }
  if (questionIndex > myQuiz.questions.length - 1) {
    history.push('/question/1')
    return null
  }
  const question = myQuiz.questions[questionIndex]
  if (isEmpty(account)) {
    console.log('account is empty')
    var tempAccount = window.sessionStorage.getItem('account')
    if (isEmpty(tempAccount)) {
      history.push('/login')
    }
  }

  const onQuestionClick = id => console.log(id)
  const handleChange = event => {
    setOption(event.target.value)
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
        <Paper elevation={7} className={classes.questionPaper}>
          <Typography align='center' variant='h3'>
            {question.text}
          </Typography>

        </Paper>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Question

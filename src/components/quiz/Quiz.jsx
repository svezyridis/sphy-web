import React, { useState } from 'react'
import DefaultAppBar from '../DefaultAppBar'
import Copyright from '../Copyright'
import homeStyle from '../../styles/homeStyle'
import classNames from 'classnames'
import HomeDrawer from '../home/HomeDrawer'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import armyImage from '../../images/army.jpg'
import navyImage from '../../images/navy.jpg'
import ariforceImage from '../../images/airforce.jpg'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import HomeIcon from '@material-ui/icons/Home'
import QuizWeaponCard from './QuizWeaponCard'
import isEmpty from 'lodash.isempty'
import { fetch } from 'whatwg-fetch'
import { baseURL } from '../../general/constants'
import QuizInProgressDialog from './QuizInProgressDialog'
import find from 'lodash.find'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import LoadingDialog from './LoadingDialog'

const subjectsURL = baseURL + 'subject/'
const questionsURL = baseURL + 'question/'
const Quiz = ({
  dark,
  open,
  toogleDrawer,
  account,
  deleteAccount,
  quizes,
  deleteQuiz,
  createQuiz,
  addQuestion,
  history
}) => {
  const [loading, setLoading] = useState(false)
  const classes = homeStyle()
  var categories = {}
  var controller = new window.AbortController()
  var signal = controller.signal

  if (isEmpty(account)) {
    console.log('account is empty')
    var tempAccount = window.sessionStorage.getItem('account')
    if (isEmpty(tempAccount)) {
      history.push('/login')
      return null
    }
  }
  const username = account.metadata.username
  const myQuiz = find(quizes, { username: username })

  const onCategoriesChange = branch => subjectCategories => {
    categories[branch] = subjectCategories
  }

  const getQuestionsOfSubject = subject =>
    new Promise((resolve, reject) => {
      fetch(questionsURL + subject.uri, {
        method: 'GET',
        credentials: 'include',
        headers: {
          authorization: 'Bearer ' + account.token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            let questions = data.result
            questions = questions.map(question => ({ ...question, subject }))
            resolve(isEmpty(questions) ? null : questions)
          } else { reject(data.message) }
        })
        .catch(error => reject(error))
    })

  const getQuestionsOfCategory = (branch, category) =>
    new Promise((resolve, reject) => {
      fetch(subjectsURL + branch + '/' + category.uri, {
        method: 'GET',
        credentials: 'include',
        headers: {
          authorization: 'Bearer ' + account.token
        },
        signal: signal
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'error') {
            reject(data.message)
          } else {
            const subjects = data.result
            Promise.all(
              subjects.map(subject => getQuestionsOfSubject(subject))
            ).then(result => {
              result = result.flat(2)
                .filter(question => question !== null)
                .map(question => ({ ...question, branch: category.branch, category: category.uri }))
              resolve(isEmpty(result) ? null : result)
            })
          }
        })
        .catch(error => {
          if (!controller.signal.aborted) {
            console.error(error)
            reject(error)
          }
        })
    })

  const onQuizStart = () => {
    createQuiz(username)
    setLoading(true)
    const categoriesToFetch = []
    Object.entries(categories).forEach(([branch, branchCategories]) => {
      branchCategories.forEach(category => {
        categoriesToFetch.push({ ...category, branch })
      })
    })
    Promise.all(
      categoriesToFetch.map(category =>
        getQuestionsOfCategory(category.branch, category)
      )
    ).then(questions => {
      questions = questions.flat()
        .filter(questions => questions !== null)
      questions.forEach(question => {
        addQuestion(username, question)
      })
      setLoading(false)
      // history.push('/question/1')
    })
      .catch(error => {
        console.log(error)
        deleteQuiz(username)
        setLoading(false)
      })
  }
  const continueQuiz = () => console.log('continue')
  const onDeleteQuiz = () => deleteQuiz(username)
  const reviewQuiz = () => console.log('review')

  return (
    <div className={classes.root}>
      <DefaultAppBar open={open} onClick={toogleDrawer} classes={classes} />
      <QuizInProgressDialog
        open={!isEmpty(myQuiz) && !loading}
        onGoToQuiz={continueQuiz}
        onNewQuiz={onDeleteQuiz}
        onReview={reviewQuiz}
        finished={myQuiz && myQuiz.finished}
        dark={dark}
      />
      <LoadingDialog open={loading} reason='Γίνεται λήψη ερωτήσεων' />
      <HomeDrawer
        open={open}
        setOpen={toogleDrawer}
        account={account}
        deleteAccount={deleteAccount}
        classes={classes}
        onQuizStart={onQuizStart}
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

        <Typography variant='h3' color='textPrimary' align='center'>
          Επιλέξτε κατηγοριες ερωτήσεων
        </Typography>
        <Grid
          container
          alignItems='flex-start'
          justify='center'
          spacing={5}
          className={classes.grid}
        >
          <Grid item>
            <QuizWeaponCard
              image={armyImage}
              branch='army'
              account={account}
              dark={dark}
              onCategoriesChange={onCategoriesChange('army')}
            />
          </Grid>
          <Grid item>
            <QuizWeaponCard
              image={navyImage}
              branch='navy'
              account={account}
              dark={dark}
              onCategoriesChange={onCategoriesChange('navy')}
            />
          </Grid>
          <Grid item>
            <QuizWeaponCard
              image={ariforceImage}
              branch='airforce'
              account={account}
              dark={dark}
              onCategoriesChange={onCategoriesChange('airforce')}
            />
          </Grid>
        </Grid>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Quiz

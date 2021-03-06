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
import { objectToQueryString } from '../../general/helperFunctions'

const questionsURL = baseURL + 'questions'
const Quiz = ({
  dark,
  open,
  toogleDrawer,
  account,
  deleteAccount,
  quizes,
  deleteQuiz,
  createQuiz,
  addQuestions,
  categories,
  deleteCategory,
  addCategory,
  setChecked,
  history
}) => {
  const [loading, setLoading] = useState(false)
  const classes = homeStyle()
  var controller = new window.AbortController()
  var signal = controller.signal

  if (isEmpty(account)) {
    history.push('/login')
    return null
  }
  const username = account.metadata.username
  const myQuiz = find(quizes, { username: username })

  const onCategoriesChange = branch => subjectCategories => {
    categories[branch] = subjectCategories
  }

  const getQuestions = categories => {
    const categoryIDs = categories.map(category => category.id)
    const params = { categoryIDs: categoryIDs }
    fetch(questionsURL + objectToQueryString(params), {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      signal: signal
    })
      .then(response => {
        if (response.ok) return response.json()
        else throw Error(`Request rejected with status ${response.status}`)
      })
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error') {
          console.log(message)
          setLoading(false)
        } else {
          addQuestions(username, result)
          setLoading(false)
          history.push('/question/1')
        }
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }

  const onQuizStart = () => {
    createQuiz(username)
    const categoriesToFetch = categories.filter(category => category.checked)
    getQuestions(categoriesToFetch)
    setLoading(true)
  }
  const continueQuiz = () => console.log(history.push('/question/1'))
  const onDeleteQuiz = () => deleteQuiz(username)
  const reviewQuiz = () => console.log(history.push('/review/1'))

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
        classes={classes}
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
            Αρχική
          </Link>
          <Link
            component='button'
            variant='body1'
            className={classNames(classes.link, dark && classes.dark)}
          >
            <FormatListNumberedIcon className={classes.icon} />
            Αυτοαξιολόγηση
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
              categories={categories}
              addCategory={addCategory}
              setChecked={setChecked}
              deleteCategory={deleteCategory}
            />
          </Grid>
          <Grid item>
            <QuizWeaponCard
              image={navyImage}
              branch='navy'
              account={account}
              dark={dark}
              onCategoriesChange={onCategoriesChange('navy')}
              categories={categories}
              addCategory={addCategory}
              setChecked={setChecked}
              deleteCategory={deleteCategory}
            />
          </Grid>
          <Grid item>
            <QuizWeaponCard
              image={ariforceImage}
              branch='airforce'
              account={account}
              dark={dark}
              onCategoriesChange={onCategoriesChange('airforce')}
              categories={categories}
              addCategory={addCategory}
              deleteCategory={deleteCategory}
              setChecked={setChecked}
            />
          </Grid>
        </Grid>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Quiz

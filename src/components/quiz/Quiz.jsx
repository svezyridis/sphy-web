import React, { useState, useEffect, useReducer } from 'react'
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

const Quiz = ({ open, toogleDrawer, account, deleteAccount, history }) => {
  const classes = homeStyle()
  if (isEmpty(account)) {
    console.log('account is empty')
    var tempAccount = window.sessionStorage.getItem('account')
    if (isEmpty(tempAccount)) {
      history.push('/login')
      return null
    }
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
      />
      <div className={classNames(classes.rest, !open && classes.closed)}>
        <Breadcrumbs>
          <Link component='button' variant='body1' onClick={() => { history.push('/') }} className={classes.link}>
            <HomeIcon className={classes.icon} />
            Home
          </Link>
          <Link component='button' variant='body1' onClick={() => { history.push('/info') }} className={classes.link}>
            <FormatListNumberedIcon className={classes.icon} />
            Quiz
          </Link>
        </Breadcrumbs>

        <Typography variant='h3' color='textPrimary'>Επιλέξτε κατηγοριες ερωτήσεων</Typography>
        <Grid container alignItems='flex-start' justify='center' spacing={5} className={classes.grid}>
          <Grid item>
            <QuizWeaponCard image={armyImage} branch='army' account={account} />
          </Grid>
          <Grid item>
            <QuizWeaponCard image={navyImage} branch='navy' account={account} />
          </Grid>
          <Grid item>
            <QuizWeaponCard image={ariforceImage} branch='airforce' account={account} />
          </Grid>
        </Grid>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Quiz

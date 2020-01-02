import React from 'react'
import DefaultAppBar from '../DefaultAppBar'
import HomeDrawer from './HomeDrawer'
import Copyright from '../Copyright'
import items from '../../general/testimages'
import HomeCarousel from '../Carousel'
import homeStyle from '../../styles/homeStyle'
import classNames from 'classnames'
import Announcments from '../Announcments'
import isEmpty from 'lodash.isempty'
import { useHistory } from 'react-router-dom'

const Home = ({ open, toogleDrawer, account, deleteAccount }) => {
  const classes = homeStyle()
  const history = useHistory()
  console.log(account)
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
        <HomeCarousel items={items} classes={classes} />
        <Announcments />
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Home

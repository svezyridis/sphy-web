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
  if (isEmpty(account)) {
    history.push('/login')
    return null
  }

  return (
    <div className={classes.root}>
      <DefaultAppBar />
      <HomeDrawer
        account={account}
        deleteAccount={deleteAccount}
        classes={classes}
      />
      }
      <div className={classNames(classes.rest, !open && classes.closed)}>
        <HomeCarousel items={items} classes={classes} />
        <Announcments />
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default Home

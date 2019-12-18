import React from 'react'
import DefaultAppBar from '../DefaultAppBar'
import HomeDrawer from './HomeDrawer'
import Copyright from '../Copyright'
import items from '../../general/testimages'
import HomeCarousel from '../Carousel'
import homeStyle from '../../styles/homeStyle'
import classNames from 'classnames'
import Announcments from '../Announcments'

const Home = ({ open, toogleDrawer, account, deleteAccount }) => {
  const classes = homeStyle()
  console.log(!open)
  return (
    <div>
      <DefaultAppBar open={open} onClick={toogleDrawer} classes={classes} />
      <HomeDrawer
        open={open}
        setOpen={toogleDrawer}
        account={account}
        logout={deleteAccount}
        classes={classes}
      />
      <div className={classNames(classes.rest, !open && classes.closed)}>
        <HomeCarousel items={items} />
        <Announcments />
        <Copyright open={open} />
      </div>
    </div>
  )
}
export default Home

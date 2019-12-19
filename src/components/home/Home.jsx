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
  var docWidth = document.documentElement.offsetWidth;

  [].forEach.call(
    document.querySelectorAll('*'),
    function (el) {
      if (el.offsetWidth > docWidth) {
        console.log(el)
      }
    }
  )
  console.log(!open)
  return (
    <div className={classes.root}>
      <DefaultAppBar open={open} onClick={toogleDrawer} classes={classes} />
      <HomeDrawer
        open={open}
        setOpen={toogleDrawer}
        account={account}
        logout={deleteAccount}
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

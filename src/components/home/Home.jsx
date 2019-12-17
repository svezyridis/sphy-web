import React from 'react'
import DefaultAppBar from '../DefaultAppBar'
import HomeDrawer from './HomeDrawer'

const Home = ({ open, toogleDrawer }) => {
  return (
    <div>
      <DefaultAppBar open={open} onClick={() => toogleDrawer(true)} />
      <HomeDrawer open={open} setOpen={() => toogleDrawer(false)} />
    </div>

  )
}
export default Home

import React from 'react'
import HomeCarousel from '../Carousel'
import LoginDrawer from './LoginDrawer'
import Copyright from '../Copyright'
import SimpleAppBar from './SimpleAppBar'
import items from '../../general/testimages'

const Login = ({ account, addAccount }) => {
  return (
    <div>
      <SimpleAppBar />
      <LoginDrawer account={account} addAccount={addAccount} />
      <HomeCarousel items={items} />
      <Copyright />
    </div>
  )
}

export default Login

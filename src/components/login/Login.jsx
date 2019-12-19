import React from 'react'
import HomeCarousel from '../Carousel'
import LoginDrawer from './LoginDrawer'
import Copyright from '../Copyright'
import SimpleAppBar from './SimpleAppBar'
import items from '../../general/testimages'
import loginStyle from '../../styles/loginStyle'

const Login = ({ account, addAccount }) => {
  const classes = loginStyle()
  return (
    <div>
      <SimpleAppBar />
      <LoginDrawer account={account} addAccount={addAccount} />
      <div className={classes.spacer}>
        <HomeCarousel items={items} />
      </div>
      <Copyright open />
    </div>
  )
}

export default Login

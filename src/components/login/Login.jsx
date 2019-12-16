import React from 'react'
import HomeCarousel from './Carousel'
import LoginDrawer from './LoginDrawer'
import Copyright from '../Copyright'
import SimpleAppBar from './SimpleAppBar'

const items = [
  {
    Items: [
      {
        Name: 'Macbook Pro',
        Image: 'https://source.unsplash.com/featured/?macbook'
      },
      {
        Name: 'iPhone',
        Image: 'https://source.unsplash.com/featured/?iphone'
      }
    ]
  },
  {
    Items: [
      {
        Name: 'Washing Machine WX9102',
        Image: 'https://source.unsplash.com/featured/?washingmachine'
      },
      {
        Name: 'Learus Vacuum Cleaner',
        Image: 'https://source.unsplash.com/featured/?vacuum,cleaner'
      }
    ]
  },
  {
    Items: [
      {
        Name: 'Living Room Lamp',
        Image: 'https://source.unsplash.com/featured/?lamp'
      },
      {
        Name: 'Floral Vase',
        Image: 'https://source.unsplash.com/featured/?vase'
      }
    ]
  }
]

const Login = () => {
  return (
    <div>
      <SimpleAppBar />
      <LoginDrawer />
      <div>
        <HomeCarousel items={items} />
      </div>
      <Copyright />
    </div>
  )
}

export default Login

import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import logo from '../../images/ges_logo.png'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  img: {
    maxHeight: '50px'
  }
}))

const SimpleAppBar = () => {
  const classes = useStyles()
  return (
    <AppBar position='static'>
      <Toolbar>
        <div>
          <img src={logo} className={classes.img} alt='logo' />
        </div>
      </Toolbar>
    </AppBar>
  )
}
export default SimpleAppBar

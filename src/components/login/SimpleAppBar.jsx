import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import logo from '../../images/ges_logo.png'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { drawerWidth } from '../../styles/loginStyle'
const imageHeight = 50

const useStyles = makeStyles(theme => ({
  img: {
    maxHeight: `${imageHeight}px`
  },
  title: {
    marginLeft: `calc(50% - ${1.7 * imageHeight}px)`
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  }
}))

const SimpleAppBar = () => {
  const classes = useStyles()
  console.log(drawerWidth)
  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <div>
          <img src={logo} className={classes.img} alt='logo' />
        </div>
        <Typography className={classes.title} variant='h5' align='center'>
          fancy title
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
export default SimpleAppBar

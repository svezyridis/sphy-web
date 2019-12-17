import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import logo from '../images/ges_logo.png'
import homeStyle from '../styles/homeStyle'

const DefaultAppBar = ({ open, onClick }) => {
  const classes = homeStyle()

  return (
    <AppBar
      position='absolute'
      className={classNames(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar disableGutters={!open} className={classes.toolbar}>
        <div>
          <img src={logo} className={classes.img} alt='logo' />
        </div>
        <IconButton
          color='inherit'
          onClick={() => onClick(true)}
          className={classNames(
            classes.menuButton,
            open && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
export default DefaultAppBar

import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'
import logo from '../images/ges_logo.png'
import title from '../images/banner_logo.png'
import homeStyle from '../styles/homeStyle'
import Switch from '@material-ui/core/Switch'
import { useSelector, useDispatch } from 'react-redux'
import { toogleDrawer, toogleDark } from '../store/actions'

const DefaultAppBar = () => {
  const classes = homeStyle()
  const dark = useSelector(state => state.dark)
  const open = useSelector(state => state.open)
  const dispatch = useDispatch()

  const onClick = open => dispatch(toogleDrawer(open))
  const onSwitch = () => dispatch(toogleDark())
  return (
    <AppBar
      position='fixed'
      className={classNames(classes.appBar, open && classes.appBarShift)}
      color='primary'
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.imageSpacer}>
          <img src={logo} className={classes.img} alt='logo' />
        </div>
        <div className={classes.logoContainer}>
          <img src={title} alt='title' className={classes.logo} />
        </div>
        <Switch
          checked={dark}
          onChange={onSwitch}
          className={classNames(
            classes.darkIcon,
            open && classes.darkIconHidden
          )}
        />
        <IconButton
          color='inherit'
          onClick={() => onClick(true)}
          className={classNames(
            classes.menuIcon,
            open && classes.menuIconHidden
          )}
          edge='end'
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
export default DefaultAppBar

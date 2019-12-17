import React from 'react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import drawerStyle from '../../styles/drawerStyle'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Typography from '@material-ui/core/Typography'

const HomeDrawer = ({ open, setOpen }) => {
  console.log(open)
  const classes = drawerStyle()
  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classNames(
          classes.paper,
          !open && classes.paperClose
        )
      }}
      open={open}
      anchor='right'
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <div className={classes.toolbar} />
      <Divider />
      <div className={classes.paper} />
    </Drawer>
  )
}

export default HomeDrawer

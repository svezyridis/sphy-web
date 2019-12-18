import React from 'react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Typography from '@material-ui/core/Typography'
import { titleCase } from '../../general/helperFunctions'
import homeStyle from '../../styles/homeStyle'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const HomeDrawer = ({ open, setOpen, account, logout, classes }) => {
  const { username, firstName, lastName, serialNumber } = account.metadata
  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: classNames(classes.paper, !open && classes.paperClose)
      }}
      open={open}
      anchor='right'
    >
      <IconButton
        onClick={() => setOpen(false)}
        className={classes.toolbarIcon}
      >
        <ChevronRightIcon />
        <Typography color='primary' variant='h5'>
          {titleCase(`${firstName} ${lastName}`)}
        </Typography>
      </IconButton>

      <Divider />
    </Drawer>
  )
}

export default HomeDrawer

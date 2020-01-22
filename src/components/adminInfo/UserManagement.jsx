import React from 'react'
import DefaultAppBar from '../DefaultAppBar'
import HomeDrawer from './HomeDrawer'
import Copyright from '../Copyright'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Link from '@material-ui/core/Link'
import homeStyle from '../../styles/homeStyle'
import classNames from 'classnames'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import isEmpty from 'lodash.isempty'
import { useHistory } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'

const UserManagement = ({ open, toogleDrawer, account, deleteAccount, dark }) => {
  const classes = homeStyle()
  const history = useHistory()
  console.log(account)
  if (isEmpty(account)) {
    history.push('/login')
    return null
  }

  return (
    <div className={classes.root}>
      <DefaultAppBar />
      <HomeDrawer
        account={account}
        deleteAccount={deleteAccount}
        classes={classes}
      />}
      <div className={classNames(classes.rest, !open && classes.closed)}>
        <Breadcrumbs>
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push('/')
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            <HomeIcon className={classes.icon} />
            Αρχική
          </Link>
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push('/users')
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            <AccountBoxIcon className={classes.icon} />
            Διαχείρηση Χρηστών
          </Link>
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary' align='center'>
          Διαχείρηση Χρηστών
        </Typography>
        <Paper elevation={3} />
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default UserManagement

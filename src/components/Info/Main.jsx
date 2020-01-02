import React from 'react'
import DefaultAppBar from '../DefaultAppBar'
import Copyright from '../Copyright'
import homeStyle from '../../styles/homeStyle'
import classNames from 'classnames'
import isEmpty from 'lodash.isempty'
import { useHistory } from 'react-router-dom'
import HomeDrawer from '../home/HomeDrawer'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import armyImage from '../../images/army.jpg'
import navyImage from '../../images/navy.jpg'
import ariforceImage from '../../images/airforce.jpg'
import WeaponCard from './WeaponCard'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import HomeIcon from '@material-ui/icons/Home'

const MainInfo = ({ open, toogleDrawer, account, deleteAccount }) => {
  const classes = homeStyle()
  const history = useHistory()
  if (isEmpty(account)) {
    var tempAccount = window.sessionStorage.getItem('account')
    if (isEmpty(tempAccount)) {
      history.push('/login')
      return null
    }
  }
  return (
    <div className={classes.root}>
      <DefaultAppBar open={open} onClick={toogleDrawer} classes={classes} />
      <HomeDrawer
        open={open}
        setOpen={toogleDrawer}
        account={account}
        deleteAccount={deleteAccount}
        classes={classes}
      />
      <div className={classNames(classes.rest, !open && classes.closed)}>
        <Breadcrumbs>
          <Link component='button' variant='body1' onClick={() => { history.push('/') }} className={classes.link}>
            <HomeIcon className={classes.icon} />
            Home
          </Link>
          <Link component='button' variant='body1' onClick={() => { history.push('/info') }} className={classes.link}>
            <LocalLibraryIcon className={classes.icon} />
            Info
          </Link>
        </Breadcrumbs>

        <Typography variant='h2' align='center' color='textPrimary'>Επιλέξτε σώμα</Typography>
        <Grid container alignItems='center' justify='center' spacing={5} className={classes.grid}>
          <Grid item>
            <WeaponCard image={armyImage} name='ARMY' />
          </Grid>
          <Grid item>
            <WeaponCard image={navyImage} name='NAVY' />
          </Grid>
          <Grid item>
            <WeaponCard image={ariforceImage} name='AIRFORCE' />
          </Grid>
        </Grid>
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default MainInfo

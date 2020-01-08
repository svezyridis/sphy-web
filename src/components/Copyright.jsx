import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { drawerWidth } from '../styles/drawerStyle'
import classNames from 'classnames'

const useStyles = makeStyles(theme => {
  return {
    stickToBottom: {
      height: '2vh',
      width: `calc(100% - ${drawerWidth}px)`,
      position: 'fixed',
      bottom: 0,
      backgroundColor: theme.palette.primary.main,
      marginTop: '25px',
      boxShadow: '0px 7px 6px 9px rgba(0, 0, 0, 0.8)',
      color: theme.palette.grey[300],
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    closed: {
      width: `calc(100% - ${theme.spacing(7)}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  }
})

function Copyright ({ open }) {
  const classes = useStyles()
  return (
    <Typography
      variant='body2'
      color='textSecondary'
      align='center'
      className={classNames(classes.stickToBottom, !open && classes.closed)}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://sphy.army.gr/'>
        ΣΠΗΥ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright

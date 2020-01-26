import React, { useState } from 'react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import drawerStyle from '../../styles/drawerStyle'
import { fetch } from 'whatwg-fetch'
import { objectToQueryString } from '../../general/helperFunctions'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import { baseURL } from '../../general/constants'

const loginURL = baseURL + 'login'

const LoginDrawer = ({ account, addAccount, dark }) => {
  const classes = drawerStyle()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const history = useHistory()

  const login = e => {
    e.preventDefault()
    const queryParams = {
      username: username,
      password: password
    }
    fetch(loginURL + objectToQueryString(queryParams), {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error') setError(message)
        else {
          addAccount(result)
          history.push('/')
        }
      })
      .catch(error => console.error(error))
  }

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.paper
      }}
      anchor='right'
    >
      <div className={classes.toolbar} />
      <Divider />
      <div className={classes.paper}>
        <Avatar
          className={classNames(
            classes.avatar,
            error.length > 0 && classes.avatarError
          )}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Typography variant='subtitle2' color='error'>
          {error}
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='username'
            label='User Name'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            className={classes.submit}
          >
            ΕΙΣΟΔΟΣ
          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default LoginDrawer

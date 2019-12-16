import React, { useState, useEffect } from 'react'
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
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'

const loginURL = 'http://localhost:8080/login'

const LoginDrawer = () => {
  const classes = drawerStyle()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const login = e => {
    e.preventDefault()
    const queryParams = {
      username: username,
      password: password
    }
    fetch(loginURL + objectToQueryString(queryParams))
      .then(response => response.json())
      .then(data => {
        const { status, token, message } = data
        if (status === 'error') setError(message)
        else {
          var decoded = jwt.decode(token, { complete: true })
          console.log(decoded.header)
          console.log(decoded.payload)
          history.push('/home')
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
        <Avatar className={classNames(classes.avatar)}>
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
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default LoginDrawer

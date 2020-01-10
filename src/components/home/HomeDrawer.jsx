import React from 'react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Typography from '@material-ui/core/Typography'
import { titleCase } from '../../general/helperFunctions'
import { MainListItems } from './UserListItems'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toogleDrawer } from '../../store/actions'

const HomeDrawer = ({
  account,
  deleteAccount,
  classes,
  onQuizStart,
  onQuestionClick
}) => {
  const { username, firstName, lastName, serialNumber } = account.metadata
  const history = useHistory()
  const open = useSelector(state => state.open)
  const dark = useSelector(state => state.dark)
  const dispatch = useDispatch()
  const logout = () => {
    deleteAccount()
    history.push('/login')
    return null
  }

  const setOpen = open => dispatch(toogleDrawer(open))
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
        <Typography color={dark ? 'secondary' : 'primary'} variant='h4'>
          {titleCase(`${firstName} ${lastName}`)}
        </Typography>
      </IconButton>
      <Divider />
      <MainListItems />
      {onQuizStart && open ? (
        <div>
          <Divider />
          <Button
            variant='contained'
            color={dark ? 'secondary' : 'primary'}
            className={classes.logout}
            onClick={onQuizStart}
          >
            Start Quiz
          </Button>
        </div>
      ) : null}
      <Divider />
      {open ? (
        <Button
          variant='contained'
          color={dark ? 'secondary' : 'primary'}
          className={classes.logout}
          onClick={logout}
        >
          Logout
        </Button>
      ) : null}
    </Drawer>
  )
}

export default HomeDrawer

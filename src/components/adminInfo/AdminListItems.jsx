import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import List from '@material-ui/core/List'
import { useHistory } from 'react-router-dom'

export const AdminListItems = () => {
  const history = useHistory()
  return (
    <List>
      <ListItem button onClick={() => history.push('/info')}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary='Διαχείρηση Χρηστών' />
      </ListItem>
    </List>
  )
}

import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import List from '@material-ui/core/List'
import GroupIcon from '@material-ui/icons/Group'
import { useHistory } from 'react-router-dom'

export const AdminListItems = () => {
  const history = useHistory()
  return (
    <List>
      <ListItem button onClick={() => history.push('/users')}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary='Διαχείριση Χρηστών' />
      </ListItem>
    </List>
  )
}

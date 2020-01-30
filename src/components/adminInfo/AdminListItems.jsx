import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EventSeatIcon from '@material-ui/icons/EventSeat'
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
      <ListItem button onClick={() => history.push('/classes')}>
        <ListItemIcon>
          <EventSeatIcon />
        </ListItemIcon>
        <ListItemText primary='Οι τάξεις μου' />
      </ListItem>
    </List>
  )
}

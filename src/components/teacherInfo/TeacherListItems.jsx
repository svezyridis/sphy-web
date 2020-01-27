import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EventSeatIcon from '@material-ui/icons/EventSeat'
import List from '@material-ui/core/List'
import { useHistory } from 'react-router-dom'

const TeacherListItems = () => {
  const history = useHistory()
  return (
    <List>
      <ListItem button onClick={() => history.push('/classes')}>
        <ListItemIcon>
          <EventSeatIcon />
        </ListItemIcon>
        <ListItemText primary='Οι τάξεις μου' />
      </ListItem>
    </List>
  )
}

export default TeacherListItems

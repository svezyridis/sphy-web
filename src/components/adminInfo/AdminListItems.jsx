import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import MoodIcon from '@material-ui/icons/Mood'
import MoodBadIcon from '@material-ui/icons/MoodBad'
import List from '@material-ui/core/List'
import { useHistory } from 'react-router-dom'

export const MainListItems = () => {
  const history = useHistory()
  return (
    <List>
      <ListItem button onClick={() => history.push('/info')}>
        <ListItemIcon>
          <LocalLibraryIcon />
        </ListItemIcon>
        <ListItemText primary='Εκπαίδευση' />
      </ListItem>
      <ListItem button onClick={() => history.push('/quiz')}>
        <ListItemIcon>
          <MoodIcon />
        </ListItemIcon>
        <ListItemText primary='Αυτοαξιολόγηση' />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <MoodBadIcon />
        </ListItemIcon>
        <ListItemText primary='Διαγώνισμα' />
      </ListItem>
    </List>
  )
}

import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Typography } from '@material-ui/core'

const CreateNewCategoryDialog = ({ open, onEdit, onClose, classes }) => {
  const [name, setName] = useState('')
  const [URI, setURI] = useState('')
  return (
    <Dialog open={open} onClose={onClose}>
      <Typography color='secondary' align='center' variant='h5'>
        Δημιουργία νέας κατηγορίας
      </Typography>
      <DialogContent className={classes.content}>
        <TextField
          label='Όνομα'
          helperText='Το όνομα της νέας κατηγορίας'
          margin='normal'
          variant='outlined'
          value={name}
          className={classes.input}
          autoFocus
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label='URI'
          helperText='Mόνο λατινικοί χαρακτήρες και παύλα'
          margin='normal'
          variant='outlined'
          value={URI}
          className={classes.input}
          onChange={e => setURI(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΑΚΥΡΟ
        </Button>
        <Button
          onClick={() => onEdit(name, URI, imageID)}
          color='primary'
          variant='contained'
        >
          ΕΝΗΜΕΡΩΣΗ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateNewCategoryDialog

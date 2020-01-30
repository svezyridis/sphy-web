import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Typography } from '@material-ui/core'

const CreateTestDialog = ({ open, onCreate, onClose, classes }) => {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(0)

  const validateInput = () => {
    //validate first
    onCreate({ name: name, duration: duration })
  }
  const cleanState = () => {
    setName('')
    setDuration(0)
  }

  return (
    <Dialog open={open} onClose={onClose} onExit={cleanState}>
      <Typography color='secondary' align='center' variant='h5'>
        Δημιουργία νέας κατηγορίας
      </Typography>
      <DialogContent className={classes.content}>
        <TextField
          label='Όνομα'
          margin='normal'
          variant='outlined'
          value={name}
          className={classes.input}
          fullWidth
          autoFocus
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label='Διάρκεια (λεπτά)'
          type='number'
          InputLabelProps={{
            shrink: true
          }}
          variant='outlined'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΑΚΥΡΟ
        </Button>
        <Button onClick={validateInput} color='primary' variant='contained'>
          ΔΗΜΙΟΥΡΓΙΑ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTestDialog

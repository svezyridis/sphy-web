import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'

const CreateUnitDialog = ({ open, onCreate, onClose, classes }) => {
  const [name, setName] = useState('')
  const cleanState = () => {
    console.log('close')
    setName('')
  }
  const handleNameChange = e => setName(e.target.value)

  return (
    <Dialog open={open} onClose={onClose} onExit={cleanState}>
      <Typography color='secondary' align='center' variant='h5'>
        Δημιουργία νέας κατηγορίας
      </Typography>
      <DialogContent className={classes.content}>
        <TextField
          label='Όνομα'
          helperText='Το όνομα της μονάδας'
          margin='normal'
          variant='outlined'
          value={name}
          className={classes.input}
          fullWidth
          autoFocus
          onChange={handleNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΑΚΥΡΟ
        </Button>
        <Button onClick={() => onCreate(name)} color='primary' variant='contained'>
          ΔΗΜΙΟΥΡΓΙΑ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateUnitDialog

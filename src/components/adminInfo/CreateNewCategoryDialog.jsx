import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Typography } from '@material-ui/core'
import greekUtils from 'greek-utils'

const CreateNewCategoryDialog = ({ open, onCreate, onClose, classes }) => {
  const [name, setName] = useState('')
  const [URI, setURI] = useState('')
  const [errors, setErrors] = useState({ nameError: false, UriError: false })
  const cleanState = () => {
    console.log('close')
    setName('')
    setURI('')
  }

  const validateInput = () => {
    setErrors({
      ...errors,
      nameError: name === '',
      UriError: !/^[a-z0-9-]+$/.test(URI)
    })
    if (!(name === '' || !/^[a-z0-9-]+$/.test(URI))) {
      onCreate(name, URI)
    }
  }

  console.log(errors)
  const handleNameChange = e => {
    let name = e.target.value
    setName(e.target.value)
    name = name.toLowerCase()
    name = greekUtils.toGreeklish(name)
    name = name.replace(/[^a-zA-Z ]/g, '')
    name = name.split(' ').join('-')
    setURI(name)
  }

  return (
    <Dialog open={open} onClose={onClose} onExit={cleanState}>
      <Typography color='secondary' align='center' variant='h5'>
        Δημιουργία νέας κατηγορίας
      </Typography>
      <DialogContent className={classes.content}>
        <TextField
          error={errors.nameError}
          label='Όνομα'
          helperText='Το όνομα της νέας κατηγορίας'
          margin='normal'
          variant='outlined'
          value={name}
          className={classes.input}
          fullWidth
          autoFocus
          onChange={handleNameChange}
        />
        <TextField
          error={errors.UriError}
          label='URI'
          helperText='Mόνο λατινικοί χαρακτήρες και παύλα'
          margin='normal'
          variant='outlined'
          value={URI}
          fullWidth
          className={classes.input}
          disabled
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

export default CreateNewCategoryDialog

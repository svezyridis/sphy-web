import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Typography } from '@material-ui/core'
import createSubjectStyle from '../../styles/createSubjectStyle'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import unavailableImage from '../../images/unavailable.png'
import EditSubjectImageDialog2 from './EditSubjectImagesDialog2'
import { baseURL } from '../../general/constants'
import { fetch } from 'whatwg-fetch'

const EditSubjectDialog = ({ dialogOpen, onEdit, onClose, subject, getSubjects, branch }) => {
  const [name, setName] = useState(subject.name)
  const [URI, setURI] = useState(subject.uri)
  const [general, setGeneral] = useState(subject.general)
  const [units, setUnits] = useState(subject.units)
  const classes = createSubjectStyle()
  const [addImage, setAddImage] = useState(false)
  const [defaultImage, setDefaultImage] = useState(subject.defaultImage)
  console.log(subject)
  console.log(branch)
  var controller = new window.AbortController()
  var signal = controller.signal

  const onUpdate = (name, general, units, defaultImageID) => {
    console.log(name, general, units, defaultImageID)
    const subjectToCreate = { name: name, general: general, units: units, defaultImageID }
    fetch(baseURL + 'subject/' + branch + '/' + subject.category + '/' + subject.uri, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(subjectToCreate),
      signal: signal
    }).then(response =>
      response.json().then(json => {
        console.log(json)
        getSubjects()
        return json
      }))
      .catch(error => console.log(error))
  }

  const imageEditorHandler = () => {
    setAddImage(true)
  }

  const handleClose = () => {
    setAddImage(false)
  }

  const defaultImageHandler = (image) => {
    setDefaultImage(image)
  }

  var imageEditor = null

  if (addImage) {
    imageEditor = (
      <EditSubjectImageDialog2
        addImage={addImage}
        handleClose={handleClose}
        imageArray={subject.images}
        uri={subject.uri}
        defaultImage={defaultImage}
        category={subject.category}
        getSubjects={getSubjects}
        defaultImageHandler={defaultImageHandler}
        branch={branch}
      />)
  }
  return (
    <Dialog
      open={dialogOpen}
      onClose={onClose}
      className={classes.dialog}
      classes={{ paper: classes.dialog }}
      disableBackdropClick
    >
      {imageEditor}
      <Typography color='secondary' align='center' variant='h5'>
        Επεξεργασία θέματος
      </Typography>
      <DialogContent className={classes.content}>
        <TextField
          label='Όνομα'
          helperText='Το όνομα του θέματος'
          margin='normal'
          variant='outlined'
          value={name}
          className={classes.input}
          fullWidth
          autoFocus
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label='URI'
          helperText='Mόνο λατινικοί χαρακτήρες και παύλα'
          margin='normal'
          variant='outlined'
          value={URI}
          disabled
          fullWidth
          className={classes.input}
          onChange={e => setURI(e.target.value)}
        />
        <TextField
          label='Γενικά'
          multiline
          fullWidth
          rows='8'
          rowsMax='10'
          value={general}
          variant='outlined'
          className={classes.text}
          onChange={e => setGeneral(e.target.value)}
        />
        <TextField
          label='Σχηματισμοί που το διαθέτουν'
          multiline
          fullWidth
          rows='4'
          rowsMax='7'
          value={units}
          variant='outlined'
          className={classes.text}
          onChange={e => setUnits(e.target.value)}
        />
        <Grid container alignItems='flex-end' spacing={1}>
          <Grid item>
            <Typography variant='subtitle2'>Κεντρική εικόνα</Typography>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={subject.image ? subject.image : unavailableImage}
                title={
                  subject.defaultImage && subject.defaultImage.label
                    ? subject.defaultImage.label
                    : 'Δεν υπάρχει διαθέσιμη εικόνα'
                }
              />
            </Card>
          </Grid>
          <Grid item>
            <Tooltip title='Επεξεργασία εικόνων'>
              <Fab
                size='medium'
                onClick={imageEditorHandler}
                className={classes.fab}
              >
                <EditIcon color='secondary' />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΑΚΥΡΟ
        </Button>
        <Button
          onClick={() => onUpdate(name, general, units, defaultImage.id)}
          color='primary'
          variant='contained'
        >
          Επεξεργασία
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditSubjectDialog

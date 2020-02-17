import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Typography } from '@material-ui/core'
import createSubjectStyle from '../../styles/createSubjectStyle'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import unavailableImage from '../../images/unavailable.png'
import EditSubjectImageDialog from './EditSubjectImagesDialog'
import EditQuestionDialog from './EditQuestionDialog'
import CreateQuestionDialog from './CreateQuestionDialog'
import { baseURL } from '../../general/constants'
import { fetch } from 'whatwg-fetch'
import { objectToQueryString } from '../../general/helperFunctions'

const EditSubjectDialog = ({ dialogOpen, onEdit, onClose, subject, getSubjects, branch }) => {
  const [name, setName] = useState(subject.name)
  const [URI, setURI] = useState(subject.uri)
  const [general, setGeneral] = useState(subject.general)
  const [units, setUnits] = useState(subject.units)
  const [questionDelete, setQuestionDelete] = useState(false)
  const [questionsToDelete, setQuestionsToDelete] = useState([])
  const [originalQuestions, setOriginalQuestions] = useState([])
  const [questionAdd, setQuestionAdd] = useState(false)
  const classes = createSubjectStyle()
  const [addImage, setAddImage] = useState(false)
  const [defaultImage, setDefaultImage] = useState(subject.defaultImage)
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

  useEffect(() => {
    fetch(baseURL + 'questions/' + subject.uri, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      signal: signal
    }).then(response => {
      if (response.ok) { return response.json() } else throw Error(`Request rejected with status ${response.status}`)
    })
      .then(data => {
        const { status, result, message } = data
        if (status === 'success')
          {setOriginalQuestions(result)}
        else
          {console.log(message)}
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }, [])

  const imageEditorHandler = () => {
    setAddImage(true)
  }

  const handleClose = () => {
    setAddImage(false)
  }

  const handleCloseQuestionDeleteDialog = () => {
    setQuestionDelete(false)
  }

  const handleCloseQuestionAddDialog = () => {
    setQuestionAdd(false)
  }

  const defaultImageHandler = (image) => {
    setDefaultImage(image)
  }

  const questionDeleteHandler = () => {
    setQuestionDelete(true)
  }

  const questionAddHandler = () => {
    setQuestionAdd(true)
  }

  let imageEditor = null
  let questionDeleteEditor = null
  let questionAddEditor = null

  if (addImage) {
    imageEditor = (
      <EditSubjectImageDialog
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

  if (questionDelete) {
    questionDeleteEditor = (
      <EditQuestionDialog
        handleClose={handleCloseQuestionDeleteDialog}
      />
    )
  }

  if (questionAdd) {
    questionAddEditor = (
      <CreateQuestionDialog
        handleClose={handleCloseQuestionAddDialog}
        open
      />
    )
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
      {questionDeleteEditor}
      {questionAddEditor}
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
        <Grid container alignContent='space-between' alignItems='flex-end' spacing={5}>
          <Grid item>
            <Grid container alignItems='flex-end' spacing={1}>
              <Grid item>
                <Typography variant='subtitle2'>Φωτογραφία εξωφύλλου</Typography>
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
          </Grid>
          <Grid item>
            <Grid container direction='column' spacing={3}>
              <Grid item>
                <Button variant='contained' color='primary' onClick={questionAddHandler}>
                      ΠΡΟΣΘΗΚΗ ΝΕΩΝ ΕΡΩΤΗΣΕΩΝ
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='primary' onClick={questionDeleteHandler}>
                      ΔΙΑΓΡΑΦΗ ΕΡΩΤΗΣΕΩΝ
                </Button>
              </Grid>
            </Grid>

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

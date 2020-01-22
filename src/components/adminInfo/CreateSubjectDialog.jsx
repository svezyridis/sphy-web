import React, { useState, useCallback, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Typography, Grid, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import addNewImage from '../../images/addNew.png'
import { useDropzone } from 'react-dropzone'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import classNames from 'classnames'
import find from 'lodash.find'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import createSubjectStyle from '../../styles/createSubjectStyle'
import Fab from '@material-ui/core/Fab'

const customTextfieldStyle = makeStyles(theme => ({
  root: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderColor: 'white',
    color: 'white',
    bottom: 0
  }
}))

const CreateSubjectDialog = ({ dialogOpen, onCreate, onClose }) => {
  const [name, setName] = useState('')
  const [URI, setURI] = useState('')
  const [general, setGeneral] = useState('')
  const [units, setUnits] = useState('')

  const [errors, setErrors] = useState({ nameError: false, UriError: false })
  const classes = createSubjectStyle()
  const [images, setImages] = useState([])
  const textFieldClasses = customTextfieldStyle()

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new window.FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          const src = reader.result
          const files = images.map(image => image.file)
          if (find(files, { name: file.name })) return
          setImages(images => [
            ...images,
            {
              file,
              src,
              default: images.length === 0,
              label: ''
            }
          ])
        }
        if (file) {
          reader.readAsDataURL(file)
        }
      })
    },
    [images]
  )

  const setDefaultImage = defaultImage => {
    setImages(images =>
      images.map(image =>
        defaultImage.file.name === image.file.name
          ? { ...image, default: true }
          : { ...image, default: false }
      )
    )
  }

  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isDragActive
  } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: 'image/*',
    onDrop
  })

  const setLabel = (filename, label) => {
    setImages(images =>
      images.map(image =>
        image.file.name === filename ? { ...image, label } : image
      )
    )
  }

  const deleteImage = filename => {
    setImages(images => images.filter(image => image.file.name !== filename))
  }

  const validateInput = () => {
    
    setErrors({
        ...errors,
        nameError: name === '',
        UriError: !/^[a-z0-9-]+$/.test(URI)
    })
    if(!((name === '')||(!/^[a-z0-9-]+$/.test(URI)))){
      onCreate(name, URI, general, units, images)
    }
  }
  console.log(errors)

  return (
    <Dialog
      open={dialogOpen}
      onClose={onClose}
      classes={{ paper: classes.dialog }}
      disableBackdropClick
    >
      <Typography color='secondary' align='center' variant='h5'>
        Δημιουργία νέου θέματος
      </Typography>
      <DialogContent className={classes.content}>
        <TextField
          error={errors.nameError}
          label='Όνομα'
          helperText={errors.nameError?'To όνομα είναι κενό':'Το όνομα του νέου θέματος'}
          margin='normal'
          variant='outlined'
          value={name}
          className={classes.input}
          fullWidth
          autoFocus
          onChange={e => setName(e.target.value)}
        />
        <TextField
          error={errors.UriError}
          label='URI'
          helperText='Mόνο πεζοί λατινικοί χαρακτήρες και παύλα'
          margin='normal'
          variant='outlined'
          value={URI}
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
        <Grid container spacing={3}>
          <Grid item>
            <div
              {...getRootProps({
                className: classNames(
                  classes.dropzone,
                  isDragActive && classes.dropzoneActive
                )
              })}
            >
              <input {...getInputProps()} />
              <Card elevation={8} raised className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={addNewImage}
                  title='Προθέστε φωτογραφίες'
                >
                  <Typography
                    className={classes.mediaCaption}
                    variant='caption'
                    align='center'
                  >
                    Σύρετε φωτογραφίες
                  </Typography>
                </CardMedia>
              </Card>
            </div>
            <p>
              {'ή κλικ  '}
              <span>
                <Button variant='outlined' onClick={open} color='primary'>
                  ΕΔΩ
                </Button>
                {' για να επιλέξετε'}
              </span>
            </p>
          </Grid>
          <Grid item className={classes.imageList}>
            {images.length > 0
              ? <GridList cellHeight={180} className={classes.gridList}>
                {images.map((image, index) => {
                  return (
                    <GridListTile key={index}>
                      <div className={classes.tile}>
                        <img src={image.src} className={classes.image} />
                        <TextField
                          placeholder='  Προσθέστε περιγραφή'
                          fullWidth
                          className={classes.label}
                          value={image.label ? image.label : ''}
                          inputProps={{ style: { textAlign: 'center', fontSize: '18px' } }}
                          InputProps={{
                            classes: textFieldClasses
                          }}
                          onChange={e =>
                            setLabel(image.file.name, e.target.value)}
                        />
                        <Grid container justify='flex-end'>
                          <Grid item>
                            <Tooltip title='Εικόνα εξοφύλλου'>
                              <Fab
                                onClick={() => setDefaultImage(image)}
                                color='primary'
                                size='small'
                              >
                                {image.default ? (
                                  <CheckBoxIcon fontSize='small' />
                                ) : (
                                  <CheckBoxOutlineBlankIcon fontSize='small' />
                                )}
                              </Fab>
                            </Tooltip>
                          </Grid>
                          <Grid item>
                            <Tooltip title='Διαγραφή εικόνας' color='primary'>
                              <Fab onClick={() => deleteImage(image.file.name)} size='small'>
                                <DeleteIcon fontSize='small' />
                              </Fab>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </div>
                    </GridListTile>
                  )
                })}
              </GridList>
              : <Typography align='center'> Δεν έχετε επιλέξει εικόνες</Typography>}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΑΚΥΡΟ
        </Button>
        <Button
          onClick={validateInput}
          color='primary'
          variant='contained'
        >
          ΔΗΜΙΟΥΡΓΙΑ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateSubjectDialog

import React, { useState, useCallback, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import addNewImage from '../../images/addNew.png'
import { useDropzone } from 'react-dropzone'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import classNames from 'classnames'
import find from 'lodash.find'

const dialogStyle = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey',
      color: '#8a9c8a',
      borderRadius: '10px',
      backgroundColor: '#cbd3cb'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '10px',
      outline: '3px solid black',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      }
    }
  },
  dialog: {
    minWidth: '820px'
  },
  input: {
    maxWidth: '300px',
    marginRight: '25px'
  },
  text: {
    marginTop: '20px',
    marginBottom: '15px',
    '&::-webkit-scrollbar': {
      width: '0.6em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey',
      color: '#8a9c8a',
      borderRadius: '10px',
      backgroundColor: '#cbd3cb'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '10px',
      outline: '3px solid black',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      }
    }
  },
  gridList: {
    maxHeight: '100%'
  },
  card: {
    width: '250px',
    height: '200px'
  },
  dropzone: {
    border: '3px',
    borderStyle: 'dashed',
    display: 'inline-block'
  },
  dropzoneActive: {
    borderColor: 'green',
    filter: 'brightness(115%)'
  },
  media: {
    backgroundColor: 'white',
    height: '100%',
    width: 'auto',
    overflow: 'hidden',
    position: 'relative',
    transition: '300ms'
  },
  mediaCaption: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.8,
    width: '100%',
    height: '30px',
    fontSize: '20px',
    fontWeight: 200
  },
  imageList: {
    border: '1px',
    borderStyle: 'solid',
    borderColor: 'lightgrey',
    borderRadius: '5px',
    width: 500,
    height: 300,
    padding: '4px',
    display: 'inline-block',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  label: {
    color: 'white',
    borderColor: 'white'
  }
}))

const customTextfieldStyle = makeStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    color: 'white'
  }
}))

const CreateSubjectDialog = ({ dialogOpen, onCreate, onClose }) => {
  const [name, setName] = useState('')
  const [URI, setURI] = useState('')
  const [general, setGeneral] = useState('')
  const [units, setUnits] = useState('')
  const classes = dialogStyle()
  const [images, setImages] = useState([])
  const textFieldClasses = customTextfieldStyle()

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new window.FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        console.log(images)
        const src = reader.result
        const files = images.map(image => image.file)
        console.log(files)
        console.log(file)
        if (find(files, { name: file.name })) return
        setImages(images => [...images, { file, src }])
      }
      if (file) {
        reader.readAsDataURL(file)
      }
    })
  }, [images])

  const {
    getRootProps, getInputProps,
    open, acceptedFiles,
    isDragActive
  } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: 'image/*',
    onDrop
  })

  const setLabel = (filename, label) => {
    setImages(images => images.map(image => image.file.name === filename ? { ...image, label } : image
    ))
  }

  return (
    <Dialog
      open={dialogOpen}
      onClose={onClose}
      className={classes.dialog}
      classes={{ paper: classes.dialog }}
    >
      <Typography color='secondary' align='center' variant='h5'>
        Δημιουργία νέου θέματος
      </Typography>
      <DialogContent className={classes.content}>
        <TextField
          label='Όνομα'
          helperText='Το όνομα του νέου θέματος'
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
        <Grid container spacing={2}>
          <Grid item>
            <div {...getRootProps({ className: classNames(classes.dropzone, isDragActive && classes.dropzoneActive) })}>
              <input {...getInputProps()} />
              <Card elevation={8} raised className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={addNewImage}
                  title='Προθέστε φωτογραφίες'
                >
                  <Typography className={classes.mediaCaption} variant='caption' align='center'>
            Σείρετε φωτογραφίες
                  </Typography>
                </CardMedia>
              </Card>
            </div>
            <p>{'ή κλικ  '}
              <span>
                <Button variant='contained' onClick={open}>
                  ΕΔΩ
                </Button>
                {' για να επιλέξετε'}
              </span>
            </p>
          </Grid>
          <Grid item className={classes.imageList}>
            <GridList cellHeight={180} className={classes.gridList}>
              {images.map((image, index) => {
                return (
                  <GridListTile key={index}>
                    <img src={image.src} />
                    <GridListTileBar
                      title={
                        <TextField
                          placeholder='Προσθέστε περιγραφή'
                          fullWidth
                          value={image.label ? image.label : ''}
                          InputProps={{
                            classes: textFieldClasses
                          }}
                          onChange={e => setLabel(image.file.name, e.target.value)}
                        />
                      }
                    />
                  </GridListTile>)
              })}
            </GridList>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΑΚΥΡΟ
        </Button>
        <Button
          onClick={() => onCreate(name, URI)}
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

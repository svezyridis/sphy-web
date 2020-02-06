import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { baseURL } from '../../general/constants'
import { makeStyles } from '@material-ui/styles'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import findIndex from 'lodash.findindex'
import { DropzoneArea } from 'material-ui-dropzone'
import LoadingDialog from '../quiz/LoadingDialog'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { fetch } from 'whatwg-fetch'

const cardStyle = makeStyles(theme => ({
  card: {
    height: 140,
    width: 140
  },
  media: {
    height: '100%',
    width: '100%'
  },
  mediaCaption: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.6,
    width: '100%',
    height: '20%',
    fontSize: '15px',
    fontWeight: 200
  },
  tile: {
    position: 'relative',
    height: '80%'
  },
  image: {
    height: '100%',
    position: 'absolute',
    width: '100%'
  },
  imageGrid: {
    height: '400px',
    overflow: 'auto',
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
  }
}))

const EditSubjectImageDialog = (props) => {
  const classes = cardStyle()
  const [zoomState, setZoomState] = useState(false)
  const [zoomedImage, setZoomedImage] = useState({})
  const [imagesArray, setImagesArray] = useState([...props.imageArray])
  const [uploadImages, setUploadImages] = useState([])
  const [imageUploadCounter, setImageUploadCounter] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(true)
  const [duplicateNameError, setDuplicateNameError] = useState(false)
  const [duplicateNameErrorIndex, setDuplicateNameErrorIndex] = useState(-1)
  const [defaultImageID, setDefaultImageID] = useState(props.defaultImage.id)

  const zoomImageHandler = (image) => {
    setZoomState(true)
    setZoomedImage(image)
  }

  const unzoomImageHandler = () => {
    setZoomState(false)
    setZoomedImage('')
  }

  const deleteImageHandler = (image) => {
    fetch(baseURL + 'image/' + props.branch + '/' + props.category + '/' + props.uri + '/' + image.filename, {
      method: 'DELETE',
      credentials: 'include'
    }).then(response =>
      response.json().then(json => {
        var deleteImageIndex = findIndex(imagesArray, { filename: image.filename })
        var newImageArray = [...imagesArray]
        newImageArray.splice(deleteImageIndex, 1)
        setImagesArray(newImageArray)
        props.getSubjects()
        return json
      }))
      .catch(error => console.log(error))
  }

  const imageUploadHandler = (file) => {
    setUploadImages(file)
  }

  const labelHandler = (event, image) => {
    const newImage = image
    newImage.label = event.target.value
    console.log(newImage.label)
    var deleteImageIndex = findIndex(imagesArray, { filename: image.filename })
    const newImageArray = Object.assign([...imagesArray], { [deleteImageIndex]: newImage })
    setImagesArray(newImageArray)
  }

  const imageUploadEdit = (imageArray) => {
    setImageUploadCounter(imageArray.length)
    imageArray.forEach(async image => {
      console.log(image)
      const formData = new window.FormData()
      formData.append('file', image)
      formData.append('label', '')
      formData.append('isDefault', false)

      try {
        const response = await fetch(
          baseURL + 'image/' + props.branch + '/' + props.category + '/' + props.uri,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              Accept: 'application/json'
            },
            body: formData
          }
        )
        const data = await response.json()
        setImageUploadCounter(imageUploadCounter => imageUploadCounter - 1)
        console.log(data)
      } catch (error) {
        console.error(error)
        setImageUploadCounter(imageUploadCounter => imageUploadCounter - 1)
      }
    })
    setUploadComplete(false)
  }

  if (uploadComplete === false && imageUploadCounter === 0) {
    props.getSubjects()
    setUploadComplete(true)
    props.handleClose()
  }

  console.log(defaultImageID)

  return (
    <Dialog open={props.addImage} onClose={props.handleClose} aria-labelledby='form-dialog-title'>
      {imageUploadCounter > 0 ? (
        <LoadingDialog
          open={imageUploadCounter > 0}
          reason={`Απομένουν ${imageUploadCounter} φωτογραφίες`}
        />
      ) : null}
      <DialogTitle id='form-dialog-title' align='center'>Επεξεργασία φωτογραφιών θέματος</DialogTitle>
      <DialogContent>
        <GridList cellHeight={200} cols={4} space={4} className={classes.imageGrid}>

          {imagesArray.map(image => (
            <GridListTile key={image.id}>
              <div className={classes.tile}>
                <img
                  className={classes.image}
                  src={baseURL + 'image/' + props.branch + '/' + props.category + '/' + props.uri + '/' + image.filename}
                  onClick={() => zoomImageHandler(image)}
                  alt=''
                />
                <input
                  className={classes.mediaCaption}
                  value={image.label}
                  onChange={(event) => labelHandler(event, image)}
                  disabled
                />
              </div>
              <DeleteForeverRoundedIcon
                onClick={() => deleteImageHandler(image)}
                size='small'
              />
              {image.id === props.defaultImage.id
                ? <RadioButtonCheckedIcon
                  size='small'
                  onClick={() => props.defaultImageHandler(image)}
                  />
                : <RadioButtonUncheckedIcon
                  size='small'
                  onClick={() => props.defaultImageHandler(image)}
                  />}
            </GridListTile>
          ))}

        </GridList>
        <DropzoneArea
          acceptedFiles={['image/*']}
          maxFileSize={10000000}
          onChange={(event) => imageUploadHandler(event)}
          filesLimit={10}
          dropzoneText={duplicateNameError
            ? `Η φωτογραφία στην θέση ${duplicateNameErrorIndex + 1} δεν θα προστεθεί λόγω ίδιου ονόματος παρακαλώ αλλάξτε όνομα` : 'Σύρετε εδώ φωτογραφίες η κάνετε κλικ για να προσθέσετε'}
        />
        <Dialog open={zoomState} onClose={unzoomImageHandler}>
          <img
            style={{ height: '100%', width: '100%' }}
            src={baseURL + 'image/army/' + props.category + '/' + props.uri + '/' + zoomedImage.filename}
            alt={zoomedImage.suject}
          />
        </Dialog>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='primary'>
                    KΛΕΙΣΙΜΟ
        </Button>
        <Button onClick={() => imageUploadEdit(uploadImages)} color='primary'>
                    ΑΠΟΘΗΚΕΥΣΗ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditSubjectImageDialog

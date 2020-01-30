import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Card from '@material-ui/core/Card'
import { baseURL } from '../../general/constants'
import { CardMedia, CardContent, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Zoom from '@material-ui/core/Zoom'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import Fab from '@material-ui/core/Fab'
import findIndex from 'lodash.findindex'
import { DropzoneArea } from 'material-ui-dropzone'
import LoadingDialog from '../quiz/LoadingDialog'

const cardStyle = makeStyles(theme => ({
    card: {
        height: 140,
        width: 140,
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
        height: '10%',
        fontSize: '20px',
        fontWeight: 200
      }
}))

const EditSubjectImageDialog2 = (props) => {
    console.log(props.imageArray)
    const classes = cardStyle()
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [zoomState, setZoomState] = useState(false)
    const [zoomedImage, setZoomedImage] = useState({})
    const [imagesArray, setImagesArray] = useState([...props.imageArray])
    const [uploadImages, setUploadImages] = useState([])
    const [imageUploadCounter, setImageUploadCounter] = useState(0)
    const [uploadComplete, setUploadComplete] = useState(true)

    const zoomImageHandler = (image) => {
        setZoomState(true)
        setZoomedImage(image)
    }

    const unzoomImageHandler = () => {
        setZoomState(false)
        setZoomedImage('')
    }

    const deleteImageHandler = (image) => {
        fetch(baseURL + 'image/army/' + props.category + '/' + props.uri + '/' + image.filename, {
            method: 'DELETE',
            credentials: 'include'
        }).then(response =>
            response.json().then(json => {
                var deleteImageIndex = findIndex(imagesArray, { filename: image.filename })
                var newImageArray = [...imagesArray]
                newImageArray.splice(deleteImageIndex, 1)
                setImagesArray(newImageArray)
                props.getSubjects()
                return json;
            }))
            .catch(error => console.log(error))
    }

    const imageUploadHandler = (file) => {
        setUploadImages(
            file
        )
    }

    const labelHandler = (event, image) => {
        let newImage = image
        newImage.label = event.target.value
        console.log(newImage.label)
        var deleteImageIndex = findIndex(imagesArray, { filename: image.filename })
        let newImageArray = Object.assign([...imagesArray], { [deleteImageIndex]: newImage })
        setImagesArray(newImageArray)
    }

    const imageUploadEdit = (imageArray) => {
        setImageUploadCounter(imageArray.length)
        imageArray.forEach(async image => {
            console.log(image)
            const formData = new FormData()
            formData.append('file', image)
            formData.append('label', '')
            formData.append('isDefault', false)

            try {
                const response = await fetch(
                    baseURL + 'image/army/' + props.category + '/' + props.uri,
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


    return (
        <Dialog open={props.addImage} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            {imageUploadCounter > 0 ? (
                <LoadingDialog
                    open={imageUploadCounter > 0}
                    reason={`Απομένουν ${imageUploadCounter} φωτογραφίες`}
                />
            ) : null}
            <DialogTitle id="form-dialog-title" align='center'>Επεξεργασία φωτογραφιών θέματος</DialogTitle>
            <DialogContent>
                <GridList cellHeight={200} cols={4} space={4}>
                    {imagesArray.map(image => (
                        <GridListTile key={image.id}>
                            <Card className={classes.card} elevation={8} raised>
                                <CardMedia
                                    component="img"
                                    className={classes.media}
                                    image={baseURL + 'image/army/' + props.category + '/' + props.uri + '/' + image.filename}
                                    alt={image.subject}
                                    onClick={() => zoomImageHandler(image)} >
                                        
                                </CardMedia>
                            </Card>
                            <Fab
                                onClick={() => deleteImageHandler(image)}
                                size='small'
                            >
                                <DeleteForeverRoundedIcon />
                            </Fab>
                            <Input className={classes.mediaCaption} value={image.label} onChange={(event) => labelHandler(event, image)} />
                        </GridListTile>
                    ))}
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        maxFileSize={10000000}
                        onChange={(files) => imageUploadHandler(files)}
                        dropzoneText="Σύρετε έως 3 φωτογραφίες η κάνετε κλικ για να προσθέσετε"
                    />
                </GridList>
                <Dialog open={zoomState} onClose={unzoomImageHandler}>
                    <img
                        style={{ height: '100%', width: '100%' }}
                        src={baseURL + 'image/army/' + props.category + '/' + props.uri + '/' + zoomedImage.filename}
                        alt={zoomedImage.suject}
                    />
                </Dialog>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    KΛΕΙΣΙΜΟ
                </Button>
                <Button onClick={() => imageUploadEdit(uploadImages)} color="primary">
                    ΑΠΟΘΗΚΕΥΣΗ
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditSubjectImageDialog2
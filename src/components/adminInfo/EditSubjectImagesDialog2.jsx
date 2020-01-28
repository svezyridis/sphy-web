import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Card from '@material-ui/core/Card'
import { baseURL } from '../../general/constants'
import { CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Zoom from '@material-ui/core/Zoom'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import Fab from '@material-ui/core/Fab'
import findIndex from 'lodash.findindex'
import { DropzoneArea } from 'material-ui-dropzone'

const cardStyle = makeStyles(theme => ({
    card: {
        height: 140,
        width: 140,
    },
    media: {
        height: '100%',
        width: '100%'
    }
}))

const EditSubjectImageDialog2 = (props) => {

    const classes = cardStyle()
    console.log(props.imageArray)
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [zoomState, setZoomState] = useState(false)
    const [zoomedImage, setZoomedImage] = useState({})
    const [imagesArray, setImagesArray] = useState([...props.imageArray])

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
                props.imageArray.splice(deleteImageIndex, 1)
                setImagesArray(newImageArray)
                return json;
            }))
            .catch(error => console.log(error))
    }

    console.log(imagesArray)
    return (
        <Dialog open={props.addImage} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" align='center'>Επεξεργασία φωτογραφιών θέματος</DialogTitle>
            <DialogContent>
                <GridList cellHeight={200} cols={4} space={4}>
                    {imagesArray.map(image => (
                        <GridListTile key={image.id}>
                            <Card className={classes.card} elevation={8} raised>
                                <CardMedia
                                    className={classes.media}
                                    image={baseURL + 'image/army/' + props.category + '/' + props.uri + '/' + image.filename}
                                    alt={image.subject}
                                    onClick={() => zoomImageHandler(image)} />
                            </Card>
                            <Fab
                                onClick={() => deleteImageHandler(image)}
                                size='small'
                            >
                                <DeleteForeverRoundedIcon />
                            </Fab>
                        </GridListTile>
                    ))}
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        maxFileSize={10000000}
                    />
                </GridList>
                <Dialog open={zoomState} onClose={unzoomImageHandler}>
                    <img style={{ height: '100%', width: '100%' }} src={baseURL + 'image/army/' + props.category + '/' + props.uri + '/' + zoomedImage.filename} alt={zoomedImage.suject} />
                </Dialog>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditSubjectImageDialog2
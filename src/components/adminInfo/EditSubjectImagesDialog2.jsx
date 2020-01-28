import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import {baseURL} from '../../general/constants'




const EditSubjectImageDialog2 = (props) => {

    console.log(props.imageArray)

    const filenameHandler = (filename) =>{
        console.log(baseURL+'army/'+props.category+'/'+props.uri+'/'+filename)
        return baseURL+'army/'+props.category+'/'+props.uri+'/'+filename
    }

    return (
        <Dialog open={props.addImage} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Επεξεργασία φωτογραφιών θέματος</DialogTitle>
            <DialogContent>
                <GridList cellHeight={160} cols={3}>
                    {props.imageArray.map(image => (
                        <GridListTile key={image.id}>
                            <img src={baseURL+'image/army/'+props.category+'/'+props.uri+'/'+image.filename} alt={image.subject} />
                        </GridListTile>
                    ))}
                </GridList>
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
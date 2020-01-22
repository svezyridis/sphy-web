import React from 'react'
import { Dialog, CircularProgress } from '@material-ui/core'


const ImageLoader = ({ uploadImageError, imageUploadedCounter }) => {

    console.log("Image Loader run")

    let Spinner = (
        <div>
            <p>Images Uploading</p>
            <CircularProgress />
        </div>
    )

    if (imageUploadedCounter === 0 & !uploadImageError) {
        Spinner = (
            <p>Images Successfully Uploaded</p>
        )
    }

    return (
        <Dialog open={imageUploadedCounter>0}>
            {Spinner}
        </Dialog>
    )
}

export default ImageLoader
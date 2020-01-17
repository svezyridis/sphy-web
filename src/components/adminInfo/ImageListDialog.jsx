import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import LoadingDialog from '../quiz/LoadingDialog'
import { fetch } from 'whatwg-fetch'
import { useSelector, useDispatch } from 'react-redux'
import { baseURL } from '../../general/constants'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255,0.8)'
  }
}))

const subjectsURL = baseURL + 'subject/'
const imagesURL = baseURL + 'image/'

const ImageListDialog = ({
  open,
  currentImage,
  onClose,
  onChange,
  category
}) => {
  const classes = useStyles()
  const [selectedImage, setSelectedImage] = useState(currentImage)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState([])
  const account = useSelector(state => state.account)
  console.log(images)
  const getImages = () => {
    if (images.length > 0) return
    fetch(subjectsURL + category.branch + '/' + category.uri, {
      method: 'GET',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + account.token
      }
    })
      .then(response => response.json())
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error' || status === 500) setError(message)
        else {
          result.forEach(async (subject, index) => {
            if (!subject.defaultImage) {
              return
            }
            try {
              const response = await fetch(
                imagesURL +
                  category.branch +
                  '/' +
                  category.uri +
                  '/' +
                  subject.uri +
                  '/' +
                  subject.defaultImage.filename,
                {
                  method: 'GET',
                  credentials: 'include',
                  headers: {
                    authorization: 'Bearer ' + account.token
                  }
                }
              )
              const image = await response.blob()
              var imageURL = URL.createObjectURL(image)
              setImages(images => [
                ...images,
                { ...subject.defaultImage, imageURL }
              ])
            } catch (error) {
              console.log(error)
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <LoadingDialog open={loading} reason='Γίνεται λήψη διαθέσιμων εικόνων' />
      <Dialog open={open} onEnter={getImages}>
        <DialogContent>
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
                <ListSubheader component='div'>Επιλέξτε εικόνα</ListSubheader>
              </GridListTile>
              {images.map((image, index) => (
                <GridListTile
                  key={index}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img src={image.imageURL} alt={image.label} />
                  <GridListTileBar
                    title={image.label}
                    actionIcon={
                      <IconButton
                        className={classes.icon}
                        onClick={() => setSelectedImage(image.id)}
                      >
                        {selectedImage === image.id ? (
                          <CheckBoxIcon />
                        ) : (
                          <CheckBoxOutlineBlankIcon />
                        )}
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onChange(selectedImage)}
            color='primary'
            variant='contained'
          >
            ΑΛΛΑΓΗ
          </Button>
          <Button onClick={onClose} color='primary'>
            Ακύρωση
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default ImageListDialog

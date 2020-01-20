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

const ImageListDialog = ({
  open,
  currentImage,
  onClose,
  onChange,
  onEnter,
  images,
  loading
}) => {
  const classes = useStyles()
  const [selectedImage, setSelectedImage] = useState(currentImage)

  console.log(images)
  return (
    <>
      <LoadingDialog open={loading} reason='Γίνεται λήψη διαθέσιμων εικόνων' />
      <Dialog open={open} onEnter={onEnter}>
        <DialogContent>
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
                <ListSubheader component='div'>Επιλέξτε εικόνα</ListSubheader>
              </GridListTile>
              {images.map((image, index) => (
                <GridListTile
                  key={index}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.URL} alt={image.label} />
                  <GridListTileBar
                    title={image.label}
                    actionIcon={
                      <IconButton
                        className={classes.icon}
                        onClick={() => setSelectedImage(image)}
                      >
                        {selectedImage.id === image.id ? (
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

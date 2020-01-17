import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import ImageListDialog from './ImageListDialog'
import unavailableImage from '../../images/unavailable.png'
import { makeStyles } from '@material-ui/styles'
import { Fab } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const dialogStyle = makeStyles(theme => ({
  content: {
    maxWidth: '450px'
  },
  card: {
    width: '150px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}))

const EditCategoryDialog = ({ open, onEdit, onClose, category }) => {
  const [name, setName] = useState(category.name)
  const [URI, setURI] = useState(category.uri)
  const [image, setImage] = useState({
    ...category.image,
    imageURL: category.imageURL
  })
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const classes = dialogStyle()
  const onImageChange = image => {
    console.log(image)
    setImage(image)
    setImageDialogOpen(false)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <ImageListDialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onChange={onImageChange}
        selectedImage={image}
        category={category}
        classes={classes}
      />
      <Typography color='secondary' align='center' variant='h5'>
        Επεξεργασία κατηγορίας
      </Typography>
      <DialogContent className={classes.content}>
        <Grid container direction='column'>
          <Grid item>
            <TextField
              label='Όνομα'
              helperText='Το όνομα της νέας κατηγορίας'
              margin='normal'
              variant='outlined'
              value={name}
              className={classes.input}
              autoFocus
              fullWidth
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
          </Grid>
          <Grid item>
            <Grid container alignItems='flex-end' spacing={1}>
              <Grid item>
                <Typography variant='subtitle2'>Κεντρική εικόνα</Typography>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={image.imageURL ? image.imageURL : unavailableImage}
                    title={
                      category.image
                        ? category.image.label
                        : 'Δεν υπάρχει διαθέσιμη εικόνα'
                    }
                  />
                </Card>
              </Grid>
              <Grid item>
                <Tooltip title='Αλλαγή εικόνας'>
                  <Fab
                    size='small'
                    onClick={() => setImageDialogOpen(true)}
                    className={classes.fab}
                  >
                    <EditIcon color='secondary' />
                  </Fab>
                </Tooltip>
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
          onClick={() => onEdit(name, URI, image.id)}
          color='primary'
          variant='contained'
        >
          ΕΝΗΜΕΡΩΣΗ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditCategoryDialog

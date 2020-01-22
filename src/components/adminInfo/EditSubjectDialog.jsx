import React, { useState, useCallback, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Typography } from '@material-ui/core'
import createSubjectStyle from '../../styles/createSubjectStyle'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import unavailableImage from '../../images/unavailable.png'

const EditSubjectDialog = ({ dialogOpen, onEdit, onClose, subject }) => {
  const [name, setName] = useState(subject.name)
  const [URI, setURI] = useState(subject.uri)
  const [general, setGeneral] = useState(subject.general)
  const [units, setUnits] = useState(subject.units)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(subject.image)
  const classes = createSubjectStyle()

  return (
    <Dialog
      open={dialogOpen}
      onClose={onClose}
      className={classes.dialog}
      classes={{ paper: classes.dialog }}
      disableBackdropClick
    >
      <Typography color='secondary' align='center' variant='h5'>
        Επεξεργασία θέματος
      </Typography>
      <DialogContent className={classes.content}>
        <TextField
          label='Όνομα'
          helperText='Το όνομα του θέματος'
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
        <Grid container alignItems='flex-end' spacing={1}>
          <Grid item>
            <Typography variant='subtitle2'>Κεντρική εικόνα</Typography>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={subject.image ? subject.image : unavailableImage}
                title={
                  subject.defaultImage.label
                    ? subject.defaultImage.label
                    : 'Δεν υπάρχει διαθέσιμη εικόνα'
                }
              />
            </Card>
          </Grid>
          <Grid item>
            <Tooltip title='Επεξεργασία εικόνων'>
              <Fab
                size='medium'
                onClick={() => setImageDialogOpen(true)}
                className={classes.fab}
              >
                <EditIcon color='secondary' />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΑΚΥΡΟ
        </Button>
        <Button
          onClick={() => onEdit(name, URI, general, units)}
          color='primary'
          variant='contained'
        >
          Επεξεργασία
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditSubjectDialog

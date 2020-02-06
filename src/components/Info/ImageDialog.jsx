import React from 'react'
import isEmpty from 'lodash.isempty'
import Fab from '@material-ui/core/Fab'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Modal } from '@material-ui/core'
import PrismaZoom from 'react-prismazoom'

const dialogStyle = makeStyles(theme => ({
  root: {
    width: 'min-content',
    margin: 'auto',
    outline: 'none',
    height: 'min-content',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  grid: {
    minWidth: '950px',
    backgroundColor: 'transparent',
    marginTop: 'auto',
    zIndex: 1500
  },
  img: {
    width: 'auto',
    maxWidth: '800px'
  },
  label: {
    color: 'white'
  },
  button: {
    opacity: 0.4
  },
  image: {
    maxWidth: '800px',
    maxHeight: '800px'
  }
}))
const ImageDialog = ({ open, images, index, onNext, onPrevious, onClose }) => {
  const classes = dialogStyle()
  if (isEmpty(images)) {
    return null
  }
  var img = new window.Image()
  img.src = images[index].image

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.root}>
        <Grid
          container
          alignItems='center'
          justify='space-between'
          alignContent='center'
          className={classes.grid}
        >
          <Grid item>
            <Fab color='default' className={classes.button}>
              <ChevronLeftRoundedIcon onClick={onPrevious} />
            </Fab>
          </Grid>
          <Grid item>
            <PrismaZoom>
              <img src={img.src} alt={img.label} />
            </PrismaZoom>
            <Typography align='center' variant='h6' className={classes.label}>
              {images[index].label}
            </Typography>
          </Grid>
          <Grid item>
            <Fab color='default' onClick={onNext} className={classes.button}>
              <ChevronRightRoundedIcon />
            </Fab>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}

export default ImageDialog

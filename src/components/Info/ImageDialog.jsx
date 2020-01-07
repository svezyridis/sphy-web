import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import isEmpty from 'lodash.isempty'
import Fab from '@material-ui/core/Fab'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Modal } from '@material-ui/core'

const dialogStyle = makeStyles(theme => ({
  root: {
    width: 'min-content',
    margin: 'auto',
    marginTop: '10%',
    outline: 'none'
  },
  grid: {
    width: '950px',
    backgroundColor: 'transparent'
  },
  img: {
    width: 'auto',
    maxWidth: '800px'
  }
}))
const ImageDialog = ({ open, images, index, onNext, onPrevious, onClose }) => {
  const classes = dialogStyle()
  if (isEmpty(images)) { return null }
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.root}
    >
      <div className={classes.root}>
        <Grid container alignItems='center' justify='space-between' alignContent='center' className={classes.grid}>
          <Grid item>
            <Fab color='primary'>
              <ChevronLeftRoundedIcon onClick={onPrevious} />
            </Fab>
          </Grid>
          <Grid item>
            <img src={images[index].image} alt={images[index].label} className={classes.img} />
          </Grid>
          <Grid item>
            <Fab color='primary' onClick={onNext}>
              <ChevronRightRoundedIcon />
            </Fab>
          </Grid>
        </Grid>
        <Typography align='center'>{images[index].label}</Typography>
      </div>

    </Modal>

  )
}

export default ImageDialog

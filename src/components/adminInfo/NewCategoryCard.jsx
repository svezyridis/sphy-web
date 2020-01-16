import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { baseURL } from '../../general/constants'
import { fetch } from 'whatwg-fetch'
import addNewImage from '../../images/addNew.png'
import CreateNewCategoryDialog from './CreateNewCategoryDialog'

const cardStyle = makeStyles(theme => ({
  card: {
    width: '100%',
    minWidth: '300px',
    height: '300px',
    border: '3px',
    borderStyle: 'dashed',
    '&:hover': {
      borderColor: 'darkred'
    }
  },
  media: {
    backgroundColor: 'white',
    height: '100%',
    width: 'auto',
    overflow: 'hidden',
    position: 'relative',
    transition: '300ms',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(115%)'
    }
  },
  mediaCaption: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.8,
    width: '100%',
    height: '10%',
    fontSize: '20px',
    fontWeight: 200
  },
  content: {
    maxWidth: '450px'
  },
  input: {
    minWidth: '200px'
  }
}))

const NewCategoryCard = ({ branch, token, createCategory }) => {
  const classes = cardStyle()
  const [error, setError] = useState('')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const controller = new window.AbortController()
  const signal = controller.signal
  const onClose = () => setCreateDialogOpen(false)
  const onCreate = (name, uri) => {
    createCategory(name, uri)
    setCreateDialogOpen(false)
  }
  return (
    <>
      <CreateNewCategoryDialog
        open={createDialogOpen}
        onClose={onClose}
        onCreate={onCreate}
        classes={classes}
      />
      <Card elevation={8} raised className={classes.card}>
        <CardMedia
          className={classes.media}
          image={addNewImage}
          title='Νέα κατηγορία'
          onClick={() => {
            setCreateDialogOpen(true)
          }}
        >
          <Typography className={classes.mediaCaption} align='center'>
            Προσθήκη κατηγορίας
          </Typography>
        </CardMedia>
      </Card>
    </>
  )
}

export default NewCategoryCard

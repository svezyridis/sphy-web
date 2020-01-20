import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import addNewImage from '../../images/addNew.png'
import CreateSubjectDialog from './CreateSubjectDialog'
import { useRouteMatch } from 'react-router-dom'

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

const NewSubjectCard = () => {
  const classes = cardStyle()
  const [error, setError] = useState('')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const controller = new window.AbortController()
  const signal = controller.signal
  const match = useRouteMatch()
  const branch = match.params.weapon
  const category = match.params.category
  const onClose = () => setCreateDialogOpen(false)
  const onCreate = (name, uri, general, units, images) => {
    console.log(branch)
    console.log(category)
    console.log(name, uri, general, units, images)
    setCreateDialogOpen(false)
  }
  return (
    <>
      <CreateSubjectDialog
        dialogOpen={createDialogOpen}
        onCreate={onCreate}
        onClose={onClose}
      />
      <Card elevation={8} raised className={classes.card}>
        <CardMedia
          className={classes.media}
          image={addNewImage}
          title='Νέο Θέμα'
          onClick={() => {
            setCreateDialogOpen(true)
          }}
        >
          <Typography className={classes.mediaCaption} align='center'>
            Προσθήκη θέματος
          </Typography>
        </CardMedia>
      </Card>
    </>
  )
}

export default NewSubjectCard

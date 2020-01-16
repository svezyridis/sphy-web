import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import CardActions from '@material-ui/core/CardActions'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import { Grid } from '@material-ui/core'
import DeleteCategoryDialog from './DeleteCategoryDialog'
import { baseURL } from '../../general/constants'
import { fetch } from 'whatwg-fetch'

const cardStyle = makeStyles(theme => ({
  card: {
    width: '100%',
    minWidth: '400px',
    height: '400px'
  },
  media: {
    backgroundColor: 'white',
    height: '80%',
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
    opacity: 0.6,
    width: '100%',
    height: '10%',
    fontSize: '20px',
    fontWeight: 200
  },
  adminMedia: {
    height: '80%'
  },
  editIcon: {
    position: 'relative',
    right: 0
  }
}))
const categoriesURL = baseURL + 'category/'
const CategoryCard = ({ weapon, category, admin, branch, token }) => {
  const classes = cardStyle()
  const history = useHistory()
  const [error, setError] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const controller = new window.AbortController()
  const signal = controller.signal
  const handleEdit = () => console.log('edit')
  const handleDelete = () => {
    fetch(categoriesURL + branch + '/' + category.uri, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + token
      },
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        const { message } = data
        console.log(message)
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
  }
  const openDeleteDialog = () => setDeleteDialogOpen(true)
  const closeDeleteDialog = () => setDeleteDialogOpen(false)

  return (
    <>
      <DeleteCategoryDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDeleteCategory={handleDelete} category={category.name} />
      <Card elevation={8} raised className={classes.card}>
        <CardMedia
          className={classes.media} image={category.imageURL} title={category.name.toUpperCase()} onClick={() => {
            history.push(`/info/${weapon.toLowerCase()}/${category.uri.toLowerCase()}`)
          }}
        >
          <Typography className={classes.mediaCaption} align='center'>
            {category.name.toUpperCase()}
          </Typography>
        </CardMedia>
        <CardActions>
          <Grid container spacing={1} className={classes.grid} justify='flex-end'>
            <Grid item className={classes.icon}>
              <Tooltip title='Επεξεργασία' placement='bottom-start'>
                <Fab color='secondary' onClick={handleEdit}>
                  <EditIcon />
                </Fab>
              </Tooltip>
            </Grid>
            <Grid item className={classes.icon}>
              <Tooltip title='Διαγραφή' placement='bottom-end'>
                <Fab onClick={openDeleteDialog}>
                  <DeleteIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>

  )
}

export default CategoryCard

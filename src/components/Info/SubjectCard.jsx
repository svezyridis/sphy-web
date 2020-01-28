import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import { Grid } from '@material-ui/core'
import DeleteSubjectDialog from '../adminInfo/DeleteSubjectDialog'
import EditSubjectDialog from '../adminInfo/EditSubjectDialog'

const cardStyle = makeStyles(theme => ({
  card: {
    width: '100%',
    minWidth: '400px',
    height: '400px'
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
    opacity: 0.6,
    width: '100%',
    height: '10%',
    fontSize: '20px',
    fontWeight: 200
  }
}))

const SubjectCard = ({ subject, admin, branch, deleteSubject }) => {
  const classes = cardStyle()
  const history = useHistory()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const handleEdit = () => {
    setEditDialogOpen(true)
  }

  const handleDelete = () => {
    deleteSubject()
    setDeleteDialogOpen(false)
  }
  return (
    <>
      <DeleteSubjectDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDeleteSubject={handleDelete}
        subject={subject.name}
      />
      <EditSubjectDialog dialogOpen={editDialogOpen} onClose={() => setEditDialogOpen(false)} subject={subject} />
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Card
            elevation={24}
            raised
            className={classes.card}
            onClick={() => {
              history.push(
                `/info/${branch.toLowerCase()}/${subject.category}/${
                  subject.uri
                }`
              )
            }}
          >
            <CardMedia
              className={classes.media}
              image={subject.image}
              title={subject.name}
            >
              <Typography className={classes.mediaCaption} align='center'>
                {subject.name}
              </Typography>
            </CardMedia>
          </Card>
        </Grid>
        <Grid item>
          {admin ? (
            <Grid item>
              <Grid
                container
                spacing={1}
                className={classes.grid}
                justify='flex-end'
              >
                <Grid item className={classes.icon}>
                  <Tooltip title='Επεξεργασία' placement='bottom-start'>
                    <Fab color='secondary' onClick={handleEdit} size='small'>
                      <EditIcon />
                    </Fab>
                  </Tooltip>
                </Grid>
                <Grid item className={classes.icon}>
                  <Tooltip title='Διαγραφή' placement='bottom-end' size='small'>
                    <Fab onClick={() => setDeleteDialogOpen(true)}>
                      <DeleteIcon />
                    </Fab>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </>
  )
}

export default SubjectCard

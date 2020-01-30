import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Typography, Grid } from '@material-ui/core'
import TestCreationWeaponCard from './TestCreationWeaponCard'
import armyImage from '../../images/army.jpg'
import navyImage from '../../images/navy.jpg'
import ariforceImage from '../../images/airforce.jpg'
import { makeStyles } from '@material-ui/styles'

const createTestStyle = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey',
      color: '#8a9c8a',
      borderRadius: '10px',
      backgroundColor: '#cbd3cb'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '10px',
      outline: '3px solid black',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      }
    }
  },
  paper: {
    minWidth: '1000px'
  },
  input: {
    maxWidth: '300px',
    marginRight: '10px'
  }
}))

const CreateTestDialog = ({ open, onCreate, onClose }) => {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(30)
  const [categories, setCategories] = useState([])
  const [noOfQuestions, setNoOfQuestions] = useState(30)
  const classes = createTestStyle()

  const setChecked = (id, checked) => {
    setCategories(categories => categories.map(category =>
      category.id === id ? { ...category, checked: checked } : category))
  }
  const validateInput = () => {
    // validate first
    onCreate(name, duration, noOfQuestions, categories.filter(category => category.checked))
  }
  const cleanState = () => {
    setName('')
    setDuration(0)
  }
  const handleNewCategories = newCategories => {
    console.log(newCategories)
    setCategories(categories => [...categories, ...newCategories])
  }

  return (
    <Dialog open={open} onClose={onClose} onExit={cleanState} classes={{ paper: classes.paper }}>
      <Typography color='secondary' align='center' variant='h5'>
        Δημιουργία διαγωνίσματος
      </Typography>
      <DialogContent className={classes.content}>
        <TextField
          label='Όνομα'
          margin='normal'
          variant='outlined'
          value={name}
          className={classes.input}
          autoFocus
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label='Διάρκεια (λεπτά)'
          type='number'
          margin='normal'
          inputProps={{ min: '0', step: '1' }}
          className={classes.input}
          variant='outlined'
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />
        <TextField
          label='Αριθμός ερωτήσεων'
          inputProps={{ min: '0', step: '1' }}
          margin='normal'
          type='number'
          value={noOfQuestions}
          className={classes.input}
          variant='outlined'
          onChange={e => setNoOfQuestions(e.target.value)}
        />
        <Grid container spacing={1} justify='space-evenly'>
          <Grid item>
            <TestCreationWeaponCard branch='army' image={armyImage} categories={categories} addCategories={handleNewCategories} setChecked={setChecked} />
          </Grid>
          <Grid item>
            <TestCreationWeaponCard branch='navy' image={navyImage} categories={categories} addCategories={handleNewCategories} setChecked={setChecked} />
          </Grid>
          <Grid item>
            <TestCreationWeaponCard branch='airforce' image={ariforceImage} categories={categories} addCategories={handleNewCategories} setChecked={setChecked} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΑΚΥΡΟ
        </Button>
        <Button onClick={validateInput} color='primary' variant='contained'>
          ΔΗΜΙΟΥΡΓΙΑ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTestDialog

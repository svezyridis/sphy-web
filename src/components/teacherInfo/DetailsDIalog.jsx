import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import MaterialTable from 'material-table'
import { Typography } from '@material-ui/core'
import tableIcons from '../../styles/userTableIcons'
import find from 'lodash.find'
import intersectionWith from 'lodash.intersectionwith'
import isEqual from 'lodash.isequal'

const detailsStyle = makeStyles(theme => ({
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

const QuestionsTable = (questions, index, value) => {
  const columns = [
    { title: 'ΑΑ', field: 'index' },
    { title: 'Ερώτηση', field: 'text' }
  ]
  const indexed = questions.map((question, index) => ({ ...question, index: index + 1 }))
  return (
    <div hidden={value !== index}>
      <MaterialTable
        options={{
          search: false,
          toolbar: false
        }}
        icons={tableIcons}
        columns={columns}
        data={indexed}
        localization={{
          pagination: {
            firstTooltip: 'Πρώτη σελίδα',
            lastTooltip: 'Τελευταία σελίδα',
            nextTooltip: 'Επόμενη σελίδα',
            previousTooltip: 'Προηγούμενη σελίδα',
            labelRowsSelect: 'γραμμές',
            labelDisplayedRows: '{from}-{to} από {count}'
          },
          toolbar: {
            searchTooltip: 'Αναζήτηση',
            searchPlaceholder: 'Αναζήτηση'
          }
        }}
      />
    </div>

  )
}

const ResultsTable = (classroom, test, index, value) => {
  const columns = [
    { title: 'ΑΑ', field: 'index' },
    { title: 'ΑΜ', field: 'serialNumber' },
    { title: 'Όνομα', field: 'firstName' },
    { title: 'Επίθετο', field: 'lastName' },
    { title: 'Βαθμός', field: 'rank' },
    { title: 'Βαθμολογία', field: 'score' }
  ]
  const testStudents = classroom.students.filter(student => Date.parse(student.timeAdded) < Date.parse(test.creationTime))
  const questionsWithCorrectAnswer = test.questions.map(question => ({ questionID: question.id, optionID: find(question.optionList, { correct: true }).id }))
  const studentsWithResults = testStudents.map((student, index) => {
    const userAswers = test.answers.filter(answer => answer.userID === student.id).map(answer => ({ questionID: answer.questionID, optionID: answer.choiceID }))
    const correctUserAnswers = intersectionWith(questionsWithCorrectAnswer, userAswers, isEqual)
    const score = userAswers.length > 0 ? ((correctUserAnswers.length / test.questions.length) * 100).toFixed(1) + '%' : '-'
    return ({ ...student, score: score, index: index + 1 })
  })
  return (
    <div hidden={value !== index}>
      <MaterialTable
        options={{
          search: false,
          toolbar: false
        }}
        icons={tableIcons}
        columns={columns}
        data={studentsWithResults}
        localization={{
          pagination: {
            firstTooltip: 'Πρώτη σελίδα',
            lastTooltip: 'Τελευταία σελίδα',
            nextTooltip: 'Επόμενη σελίδα',
            previousTooltip: 'Προηγούμενη σελίδα',
            labelRowsSelect: 'γραμμές',
            labelDisplayedRows: '{from}-{to} από {count}'
          },
          toolbar: {
            searchTooltip: 'Αναζήτηση',
            searchPlaceholder: 'Αναζήτηση'
          }
        }}
      />
    </div>

  )
}

const DetailsDialog = ({ open, onClose, classroom, test }) => {
  const classes = detailsStyle()
  const [value, setValue] = useState(0)
  const theme = useTheme()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = index => {
    setValue(index)
  }
  if (test === null) { return null }
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label='ΕΡΩΤΗΣΕΙΣ' />
          <Tab label='ΧΡΗΣΤΕΣ' />
        </Tabs>
      </AppBar>
      <DialogContent className={classes.content} />
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {QuestionsTable(test.questions, 0, value)}
        {ResultsTable(classroom, test, 1, value)}
        <Typography hidden={value !== 1}>
          Item Two
        </Typography>
      </SwipeableViews>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΚΛΕΙΣΙΜΟ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DetailsDialog

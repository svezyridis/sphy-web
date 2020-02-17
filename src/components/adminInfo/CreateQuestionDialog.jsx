import React, { useReducer, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Typography, makeStyles } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

const questionStyle = makeStyles(theme => ({
  options: {
    marginLeft: '5%'
  },
  question: {
    marginTop: '20px'
  }
}))

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [...state, { index: action.index, text: '', optionList: [{ index: 0, text: '', correct: true }] }]
    case 'DELETE_QUESTION':
      return state.filter(question => question.index !== action.index)
    case 'UPDATE_QUESTION_TEXT':
      return state.map(question => question.index !== action.index
        ? question : { ...question, text: action.text })
    case 'ADD_OPTION':
      return state.map(question => question.index !== action.index
        ? question : { ...question, optionList: [...question.optionList, { index: action.optionIndex, text: '', correct: false }] })
    case 'UPDATE_OPTION_TEXT':
      return state.map(question => question.index !== action.index
        ? question : {
          ...question,
          optionList: question.optionList.map(option =>
            option.index !== action.optionIndex ? option : { ...option, text: action.text })
        })
    case 'SET_CORRECT_OPTION':
      return state.map(question => question.index !== action.index
        ? question : {
          ...question,
          optionList: question.optionList.map(option =>
            option.index !== action.optionIndex ? { ...option, correct: false } : { ...option, correct: true })
        })
    case 'DELETE_OPTION':
      return state.map(question => question.index !== action.index
        ? question : {
          ...question,
          optionList: question.optionList.filter(option => option.index !== action.optionIndex)
        })
    default:
      return state
  }
}

const CreateQuestionDialog = ({ open, onCreate, onClose, onSave, initialQuestions }) => {
  const classes = questionStyle()
  const [questions, dispatch] = useReducer(reducer, initialQuestions)
  useEffect(() => {
    dispatch({ type: 'ADD_QUESTION', index: 0 })
  }, [])

  const handleQuestionTextChange = (event, index) => {
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      index: index,
      text: event.target.value
    })
  }

  const handleOptionTextChange = (event, index, optionIndex) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      index: index,
      optionIndex: optionIndex,
      text: event.target.value
    })
  }

  const handleCorrect = (index, optionIndex) => {
    dispatch({
      type: 'SET_CORRECT_OPTION',
      index: index,
      optionIndex: optionIndex
    })
  }

  const addQuestion = (index) => {
    dispatch({ type: 'ADD_QUESTION', index: index })
  }

  const addOption = (index, optionIndex) => {
    dispatch({
      type: 'ADD_OPTION',
      index: index,
      optionIndex: optionIndex
    })
  }
  const deleteOption = (index, optionIndex) => {
    const correctFlag = questions[index].optionList[optionIndex].correct
    if (questions[index].optionList.length > 1) {
      dispatch({
        type: 'DELETE_OPTION',
        index: index,
        optionIndex: optionIndex
      })
      if (correctFlag) { // we deleted option marked as correct
        dispatch({
          type: 'SET_CORRECT_OPTION',
          index: index,
          optionIndex: questions[index].optionList[0].index
        })
      }
    }
  }

  const deleteQuestion = (index) => {
    if (questions.length > 1) {
      dispatch({
        type: 'DELETE_QUESTION',
        index: index
      })
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Typography color='secondary' align='center' variant='h5'>
        Δημιουργία ερωτήσεων
      </Typography>
      <DialogContent className={classes.content}>
        {questions.map((question, index) => (
          <div key={index} className={classes.question}>
            <Input
              placeholder={`Ερώτηση ${index + 1}`}
              type='text'
              value={question.text}
              fullWidth
              margin='dense'
              onChange={(event) => handleQuestionTextChange(event, question.index)}
              endAdornment={
                <InputAdornment position='end'>
                  <Tooltip title='Διαγραφή ερώτησης'>
                    <span>
                      <IconButton size='small' onClick={() => deleteQuestion(question.index)} disabled={questions.length <= 1}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  {index === questions.length - 1
                    ? <Tooltip title='Προσθήκη ερώτησης'>
                      <IconButton size='small' onClick={() => addQuestion(question.index + 1)}>
                        <AddIcon />
                      </IconButton>
                      </Tooltip>
                    : null}
                </InputAdornment>
              }
            />
            {question.optionList.map((option, optionIndex) => (
              <Input
                key={optionIndex}
                className={classes.options}
                placeholder={`Επιλογή ${optionIndex + 1}`}
                type='text'
                value={option.text}
                onChange={(event) => handleOptionTextChange(event, question.index, option.index)}
                endAdornment={
                  <InputAdornment position='end'>
                    <Tooltip title='Ορισμός ως ορθής επιλογής'>
                      <Checkbox
                        checked={option.correct}
                        onChange={() => handleCorrect(question.index, option.index)}
                      />
                    </Tooltip>
                    <Tooltip title='Διαγραφή επιλογής'>
                      <span>
                        <IconButton size='small' onClick={() => deleteOption(question.index, option.index)} disabled={question.optionList.length <= 1}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    {optionIndex === question.optionList.length - 1
                      ? <Tooltip title='Προσθήκη επιλογής'>
                        <IconButton size='small' onClick={() => addOption(question.index, option.index + 1)}>
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                      : null}
                  </InputAdornment>
                }
              />
            ))}
          </div>
        ))}

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΑΚΥΡΟ
        </Button>
        <Button color='primary' variant='contained' onClick={() => onSave(questions)}>
          ΑΠΟΘΗΚΕΥΣΗ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateQuestionDialog

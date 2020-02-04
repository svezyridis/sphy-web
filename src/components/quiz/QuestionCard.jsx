import React from 'react'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Paper from '@material-ui/core/Paper'

const QuestionCard = ({
  question,
  classes,
  setOption,
  dark,
  answer,
  finished
}) => {
  const handleChange = event => {
    setOption(event.target.value)
  }
  return (
    <Paper elevation={7} className={classes.questionPaper}>
      <Typography align='center' variant='h5'>
        {question.text}
      </Typography>
      <FormControl
        component='fieldset'
        className={classes.formControl}
        disabled={finished}
      >
        <FormLabel component='legend'>Η επιλογή σας:</FormLabel>
        <RadioGroup value={answer.optionID} onChange={handleChange}>
          {question.optionList.map((option, index) => {
            return (
              <FormControlLabel
                key={index}
                value={option.id.toString()}
                control={<Radio />}
                label={option.text}
              />
            )
          })}
        </RadioGroup>
      </FormControl>
    </Paper>
  )
}
export default QuestionCard

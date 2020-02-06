import React from 'react'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Paper from '@material-ui/core/Paper'
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone'
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone'
import find from 'lodash.find'

const ReviewCard = ({ question, classes, dark, answer }) => {
  console.log()
  return (
    <Paper elevation={7} className={classes.questionPaper}>
      <Typography align='center' variant='h5'>
        {question.text}
      </Typography>
      <FormControl component='fieldset' className={classes.formControl}>
        <FormLabel>
          {`Η ορθή απάντηση είναι: ${
            find(question.optionList, { correct: true }).text
          }`}
        </FormLabel>
        {question.optionList.map((option, index) => {
          const selected = option.id === parseInt(answer.optionID)
          console.log(option)
          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selected}
                  icon={<CircleUnchecked />}
                  checkedIcon={
                    option.correct
                      ? <CheckCircleTwoToneIcon className={classes.correct} />
                      : <HighlightOffTwoToneIcon className={classes.incorrect} />

                  }
                  value={option.id.toString()}
                />
              }
              label={option.text}
            />
          )
        })}
      </FormControl>
    </Paper>
  )
}
export default ReviewCard

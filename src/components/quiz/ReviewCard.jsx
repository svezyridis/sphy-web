import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Paper from '@material-ui/core/Paper'
import { Grid, CardHeader } from '@material-ui/core'
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone'
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone'
import find from 'lodash.find'

const ReviewCard = ({ question, classes, dark, image, answer }) => {
  return (
    <Paper elevation={7} className={classes.questionPaper}>
      <Typography align='center' variant='h5'>
        {question.text}
      </Typography>
      <FormControl component='fieldset' className={classes.formControl}>
        {answer.optionID == find(question.optionList, { correct: true }).id ? (
          <FormLabel component='text'>Απαντήσατε ΣΩΣΤΑ </FormLabel>
        ) : (
          <FormLabel component='text'>Απαντήσατε ΛΑΝΘΑΣΜΕΝΑ </FormLabel>
        )}

        {question.optionList.map((option, index) => {
          const selected = option.id === parseInt(answer.optionID)
          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selected}
                  icon={
                    option.correct ? (
                      <CheckCircleTwoToneIcon className={classes.correct} />
                    ) : (
                      <CircleUnchecked />
                    )
                  }
                  checkedIcon={
                    answer.optionID ==
                    find(question.optionList, { correct: true }).id ? (
                      <CheckCircleTwoToneIcon className={classes.correct} />
                    ) : (
                      <HighlightOffTwoToneIcon className={classes.incorrect} />
                    )
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

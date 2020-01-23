import React, { useState, Fragment } from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Paper from '@material-ui/core/Paper'
import { Grid, CardHeader } from '@material-ui/core'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import CheckIcon from '@material-ui/icons/Check'
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone'
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone'
import find from 'lodash.find'


const ReviewCard = ({ question, classes, dark, image, answer }) => {
  return (
    <Paper elevation={7} className={classes.questionPaper}>
      <Grid container spacing={3} wrap='nowrap'>
        <Grid item>
          <Card className={classes.questionCard}>
            <CardHeader title={question.subject.name} />
            <CardMedia className={classes.media} image={image} />
          </Card>
        </Grid>
        <Grid item>
          <Typography align='center' variant='h5'>
          {(answer.optionID == (find(question.optionList, { correct: true }).id)) ? <CheckCircleTwoToneIcon  /> : <HighlightOffTwoToneIcon />}
            {question.text}
          </Typography>
          <FormControl component='fieldset' className={classes.formControl}>
            <FormLabel component='legend'>Η επιλογή σας:</FormLabel>
            <RadioGroup value={answer.optionID}>
              {question.optionList.map((option, index) => {
                const selected = option.id === parseInt(answer.optionID)
                console.log("this answer is: " + option.correct)
                return (
                  <Fragment>
                    <FormControlLabel
                      key={index}
                      value={option.id.toString()}
                      control={<Radio />}
                      label={option.text}
                      className={classNames(
                        option.correct && classes.correct,
                        selected && !option.correct && classes.incorrect
                      )}
                    />
                  </Fragment>
                )
              })}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  )
}
export default ReviewCard

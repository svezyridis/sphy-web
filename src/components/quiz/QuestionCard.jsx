import React, { useState } from 'react'
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

const QuestionCard = ({ question, classes, setOption, dark, image }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const handleChange = event => {
    setSelectedOption(event.target.value)
  }
  return (
    <Paper elevation={7} className={classes.questionPaper}>
      <Grid container spacing={3}>
        <Grid item>
          <Card>
            <CardHeader title={question.subject.name} />
            <CardMedia className={classes.media} image={image} />
          </Card>
        </Grid>
        <Grid item>
          <Typography align='center' variant='h5'>
            {question.text}
          </Typography>
          <FormControl component='fieldset' className={classes.formControl}>
            <FormLabel component='legend'>Η επιλογή σας:</FormLabel>
            <RadioGroup value={selectedOption} onChange={handleChange}>
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
        </Grid>
      </Grid>
    </Paper>
  )
}
export default QuestionCard

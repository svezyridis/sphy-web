import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Paper from '@material-ui/core/Paper'
import { Grid, CardHeader, Fade } from '@material-ui/core'

const QuestionCard = ({
  question,
  classes,
  setOption,
  dark,
  image,
  answer,
  finished
}) => {
  const handleChange = event => {
    setOption(event.target.value)
  }
  console.log(image)
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
        </Grid>
      </Grid>
    </Paper>

  )
}
export default QuestionCard

import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const QuestionCard = (question) => {
  return (
    <Card>
      <CardMedia
        image={question.image.file}
        title={question.image.label}
      />
      <CardContent>
        <Typography>
          {question.text}
        </Typography>
        <FormControl component='fieldset' className={classes.formControl}>
          <FormLabel component='legend'>Gender</FormLabel>
          <RadioGroup value={option} onChange={handleChange}>
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='male' control={<Radio />} label='Male' />
            <FormControlLabel
              value='other'
              control={<Radio />}
              label='Other'
            />
            <FormControlLabel
              value='disabled'
              disabled
              control={<Radio />}
              label='(Disabled option)'
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  )
}

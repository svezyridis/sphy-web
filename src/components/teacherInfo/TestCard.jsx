import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import uniqWith from 'lodash.uniqwith'

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 16
  },
  pos: {
    marginBottom: 12
  }
})

const TestCard = ({ test }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {`Κατάσταση: ${test.creationDate}`}
        </Typography>
        <Typography variant='h5' component='h2'>
          {test.name}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {`Δημιουργήθηκε: ${test.creationDate}`}
        </Typography>
        <Typography variant='body2' component='p'>
          {`Αριθμός ερωτήσεων: ${test.questions.length}`}
          <br />
          {`Υποβληθήσες απαντήσεις: ${uniqWith(test.answers, (answer1, answer2) =>
            answer1.userID === answer2.userID).length}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Περισσοτερα</Button>
      </CardActions>
    </Card>
  )
}

export default TestCard

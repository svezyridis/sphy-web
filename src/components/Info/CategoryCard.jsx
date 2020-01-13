import React from 'react'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import { titleCase } from '../../general/helperFunctions'

const cardStyle = makeStyles(theme => ({
  card: {
    width: '100%',
    minWidth: '400px',
    height: '400px'
  },
  media: {
    backgroundColor: 'white',
    height: '100%',
    width: 'auto',
    overflow: 'hidden',
    position: 'relative',
    transition: '300ms',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(115%)'
    }
  },
  mediaCaption: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.6,
    width: '100%',
    height: '10%',
    fontSize: '20px',
    fontWeight: 200
  }
}))

const CategoryCard = ({ weapon, category }) => {
  const classes = cardStyle()
  const history = useHistory()
  return (
    <Link
      component='button'
      variant='body1'
      onClick={() => {
        history.push(`/info/${weapon.toLowerCase()}/${category.uri.toLowerCase()}`)
      }}
    >
      <Card elevation={8} raised className={classes.card}>
        <CardMedia className={classes.media} image={category.image} title={category.name.toUpperCase()}>
          <Typography className={classes.mediaCaption} align='center'>
            {category.name.toUpperCase()}
          </Typography>
        </CardMedia>
      </Card>
    </Link>
  )
}

export default CategoryCard

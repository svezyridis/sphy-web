import React, { useState, useReducer, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Checkbox from '@material-ui/core/Checkbox'
import isEmpty from 'lodash.isempty'
import { setCategories, addImage, setChecked } from '../../store/actions'
import { categoriesReducer } from '../../store/reducers'
import { fetch } from 'whatwg-fetch'
import { getBranchInitials, titleCase, getBranchName } from '../../general/helperFunctions'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const categoriesURL = 'http://localhost:8080/category/'
const imagesURL = 'http://localhost:8080/image/'

const useStyles = makeStyles(theme => ({
  card: {
    width: '400px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  innerMedia: {
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
  innerCard: {
    height: '200px',
    width: '300px',
    marginBottom: '1%'
  },
  mediaCaption: {
    width: '100%',
    background: 'rgba(0, 0, 0, 0.3)',
    margin: 'auto'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

const QuizWeaponCard = ({ image, branch, account }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState('')
  const [categories, dispatchCategories] = useReducer(categoriesReducer, [])

  const handleChange = event => {
    categories.forEach(category => {
      dispatchCategories(setChecked(category.id, event.target.checked))
    })
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleCategoryChecked = id => event => {
    dispatchCategories(setChecked(id, event.target.checked))
  }

  const noOfCheckedCategories = categories.reduce((accumulator, currentValue) => currentValue.checked ? accumulator + 1 : accumulator, 0)

  useEffect(() => {
    fetch(categoriesURL + branch, {
      method: 'GET',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + account.token
      }
    })
      .then(response => response.json())
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error') setError(message)
        else {
          dispatchCategories(setCategories(result))
          result.forEach(async (category, index) => {
            if (!category.randomImage) {
              return
            }
            const response = await fetch(imagesURL + branch + '/' + category.name.toLowerCase() + '/' + category.randomImage.subject + '/' + category.randomImage.filename, {
              method: 'GET',
              credentials: 'include',
              headers: {
                authorization: 'Bearer ' + account.token
              }
            })
            const image = await response.blob()
            var imageUrl = URL.createObjectURL(image)
            dispatchCategories(addImage(category.id, imageUrl))
          })
        }
      })
      .catch(error => console.error(error))
    return () => {

    }
  }, [])

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {getBranchInitials(branch)}
          </Avatar>
        }
        action={
          <Checkbox
            checked={noOfCheckedCategories > 0}
            onChange={handleChange}
            value={branch}
            indeterminate={noOfCheckedCategories > 0 && noOfCheckedCategories < categories.length}
          />
        }
        title={getBranchName(branch)}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={getBranchName(branch)}
      />
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {categories.map((category, index) => {
            return (
              <Card key={index} className={classes.innerCard}>

                <CardMedia
                  className={classes.innerMedia}
                  image={category.image}
                  title={titleCase(category.name)}
                >
                  <FormControlLabel
                    control={<Checkbox checked={category.checked} onChange={handleCategoryChecked(category.id)} value={category.id} />}
                    label={<Typography variant='h5'>{titleCase(category.name)}</Typography>}
                    labelPlacement='start'
                    className={classes.mediaCaption}
                  />
                </CardMedia>
              </Card>
            )
          })}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default QuizWeaponCard

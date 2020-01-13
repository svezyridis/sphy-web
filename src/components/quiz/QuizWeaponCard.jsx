import React, { useState, useReducer, useEffect, Fragment } from 'react'
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
import List from '@material-ui/core/List'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Checkbox from '@material-ui/core/Checkbox'
import { setCategories, setChecked } from '../../store/actions'
import { categoriesReducer } from '../../store/reducers'
import { fetch } from 'whatwg-fetch'
import {
  getBranchInitials,
  titleCase,
  getBranchName
} from '../../general/helperFunctions'
import { baseURL } from '../../general/constants'
import classNames from 'classnames'
import { Typography, Divider } from '@material-ui/core'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const categoriesURL = baseURL + 'category/'

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
    backgroundColor: theme.palette.primary.main
  },
  darkAvatar: {
    backgroundColor: theme.palette.secondary.main
  },
  checkbox: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.primary.main
    }
  },
  darkCheckbox: {
    color: theme.palette.secondary.main,
    '&$checked': {
      color: theme.palette.secondary.main
    }
  }
}))

const QuizWeaponCard = ({
  dark,
  image,
  branch,
  account,
  onCategoriesChange
}) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState('')
  const [categories, dispatchCategories] = useReducer(categoriesReducer, [])
  var controller = new window.AbortController()
  var signal = controller.signal

  const handleChange = event => {
    categories.forEach(category => {
      dispatchCategories(setChecked(category.id, event.target.checked))
    })
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleClickAway = () => {
    setExpanded(false)
  }

  const handleCategoryChecked = category => event => {
    dispatchCategories(setChecked(category.id, !category.checked))
  }

  const noOfCheckedCategories = categories.reduce(
    (accumulator, currentValue) =>
      currentValue.checked ? accumulator + 1 : accumulator,
    0
  )

  useEffect(() => {
    fetch(categoriesURL + branch, {
      method: 'GET',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + account.token
      },
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error') setError(message)
        else {
          dispatchCategories(setCategories(result))
        }
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    onCategoriesChange(categories)
  })

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Card elevation={8} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              className={classNames(classes.avatar, dark && classes.darkAvatar)}
            >
              {getBranchInitials(branch)}
            </Avatar>
          }
          action={
            <Checkbox
              checked={noOfCheckedCategories > 0}
              onChange={handleChange}
              indeterminate={
                noOfCheckedCategories > 0 &&
                noOfCheckedCategories < categories.length
              }
              color='default'
              className={classNames(
                classes.checkbox,
                dark && classes.darkCheckbox
              )}
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
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Divider />
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <List dense className={classes.list}>
              {categories.map((category, index) => {
                return (
                  <Fragment key={index}>
                    <ListItem button onClick={handleCategoryChecked(category)}>
                      <ListItemText
                        primary={
                          <Typography>{titleCase(category.name)}</Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={category.checked}
                          onChange={handleCategoryChecked(category)}
                          value={category.id}
                          color='default'
                          className={classNames(
                            classes.checkbox,
                            dark && classes.darkCheckbox
                          )}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </Fragment>
                )
              })}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </ClickAwayListener>
  )
}

export default QuizWeaponCard

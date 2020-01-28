import React, { useState, useEffect, Fragment } from 'react'
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
import find from 'lodash.find'
import isEqual from 'lodash.isequal'
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
import quizCardStyle from '../../styles/quizCardStyle'

const categoriesURL = baseURL + 'category/'

const QuizWeaponCard = ({
  dark,
  image,
  branch,
  account,
  onCategoriesChange,
  categories,
  addCategory,
  deleteCategory,
  setChecked
}) => {
  const classes = quizCardStyle()
  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState('')
  var controller = new window.AbortController()
  var signal = controller.signal

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleClickAway = () => {
    setExpanded(false)
  }

  const handleCategoryChecked = category => event => {
    setChecked(category.id, !category.checked)
  }

  const categoriesOfBranch = categories.filter(
    category => category.branch === branch
  )

  const handleBranchChecked = event => {
    categories.forEach(category => {
      if (category.branch === branch) { setChecked(category.id, event.target.checked) }
    })
  }

  const noOfCheckedCategories = categoriesOfBranch.reduce(
    (accumulator, currentValue) =>
      currentValue.checked ? accumulator + 1 : accumulator,
    0
  )

  useEffect(() => {
    fetch(categoriesURL + branch, {
      method: 'GET',
      credentials: 'include',
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        const { status, result, message } = data
        console.log(data)
        if (status === 'error') setError(message)
        else {
          // Compare new categories with stored ones and make the necessary changes
          const newCategories = []
          const categoriesToDelete = []
          result.forEach(category => {
            category = { ...category, branch }
            const storedCategory = find(categories, { id: category.id })
            if (!storedCategory) {
              newCategories.push(category)
              return
            }
            const {
              imageURL,
              checked,
              ...originalCategoryObject
            } = storedCategory
            if (
              !isEqual(originalCategoryObject, category) &&
              category.branch === branch
            ) {
              console.log('category found but not equal')
              newCategories.push(category)
              categoriesToDelete.push(storedCategory)
            }
          })
          categories.forEach(category => {
            if (
              !find(result, { id: category.id }) &&
              category.branch === branch
            ) {
              categoriesToDelete.push(category)
            }
          })
          categoriesToDelete.forEach(category => deleteCategory(category.id))
          // add new categories and fetch their images
          newCategories.forEach(category => {
            addCategory({ ...category, branch })
          })
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
              onChange={handleBranchChecked}
              indeterminate={
                noOfCheckedCategories > 0 &&
                noOfCheckedCategories < categoriesOfBranch.length
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
              {categoriesOfBranch.map((category, index) => {
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

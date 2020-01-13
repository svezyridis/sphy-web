import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'

const useStyles = makeStyles(theme => ({
  button: {
    background: `linear-gradient(45deg, ${theme.palette.secondary.light} 20%, ${theme.palette.secondary.main} 90%)`,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
  },
  dark: {
    background: `linear-gradient(45deg, ${theme.palette.info.light} 20%, ${theme.palette.info.main} 90%)`
  }
}))

export default function CustomButton ({ dark }) {
  console.log(dark)
  const classes = useStyles()
  return <Button className={classNames(classes.button, dark && classes.dark)}>Styled with Hook API</Button>
}

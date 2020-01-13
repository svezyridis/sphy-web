import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { getBranchInitials, getBranchName } from '../../general/helperFunctions'
import CardHeader from '@material-ui/core/CardHeader'
import classNames from 'classnames'

const cardStyle = makeStyles(theme => ({
  card: {
    width: '22vw',
    minWidth: '300px',
    height: '400px'
  },
  media: {
    backgroundColor: 'white',
    height: '300px',
    width: '100%',
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
  },
  avatar: {
    backgroundColor: theme.palette.info.main
  },
  darkAvatar: {
    backgroundColor: theme.palette.info.light
  }
}))

const WeaponCard = ({ dark, image, name }) => {
  const classes = cardStyle()
  const history = useHistory()
  return (
    <Card
      elevation={8}
      className={classes.card}
      onClick={() => {
        history.push(`/info/${name.toLowerCase()}`)
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            className={classNames(classes.avatar, dark && classes.darkAvatar)}
          >
            {getBranchInitials(name)}
          </Avatar>
        }
        title={getBranchName(name)}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={getBranchName(name)}
      />
    </Card>
  )
}

export default WeaponCard

import { makeStyles } from '@material-ui/core/styles'
const quizCardStyle = makeStyles(theme => ({
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
    backgroundColor: theme.palette.info.main
  },
  darkAvatar: {
    backgroundColor: theme.palette.info.light
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

export default quizCardStyle

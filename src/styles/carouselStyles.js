import { makeStyles } from '@material-ui/styles'
import { drawerWidth } from './drawerStyle'

const carouselStyles = makeStyles(theme => ({
  carousel: {
    padding: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1000,
    marginTop: '10%'
  },
  root: {
    flexGrow: 1,
    height: 'auto',
    overflow: 'hidden',
    width: `calc(100% - ${drawerWidth}px)`
  },
  content: {
    color: 'white',
    backgroundColor: 'red',
    height: '100%',
    cursor: 'pointer',
    padding: '30px',
    transition: '300ms',
    '&:hover, &:active': {
      backgroundColor: 'green',
      viewButton: {
        backgroundColor: 'white',
        color: 'red'
      }
    }
  },
  title: {
    fontSize: '40px',
    fontWeight: 500
  },
  caption: {
    marginTop: '10px',
    fontSize: '21px'
  },
  media: {
    backgroundColor: 'white',
    height: '400px',
    overflow: 'hidden',
    position: 'relative',
    transition: '300ms',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(115%)'
    }
  },
  mediaCaption: {
    textOverflow: 'ellipsis',
    position: 'absolute',
    bottom: 0,
    padding: '15px',
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.6,
    width: '100%',
    height: '10%',
    fontSize: '20px',
    fontWeight: 200
  },
  banner: {
    height: '400px',
    position: 'relative'
  },
  bannerGrid: {
    heigth: '400px'
  },
  viewButton: {
    marginTop: '40px',
    color: 'white',
    fontSize: '25px',
    border: '3px solid white',
    textTransform: 'capitalize',
    transition: '200ms'
  }
}))

export default carouselStyles

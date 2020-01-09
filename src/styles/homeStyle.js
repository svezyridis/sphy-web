import { makeStyles } from '@material-ui/styles'
import backgroundImage from '../images/background.png'

export const drawerWidth = 400
const imageHeight = 40

const homeStyle = makeStyles(theme => ({
  root: {
    margin: 0,
    display: 'flex',
    height: '90%',
    flexDirection: 'column'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginBottom: '30vh'
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuIcon: {
    position: 'absolute',
    right: 10
  },
  darkIcon: {
    position: 'absolute',
    right: 60
  },
  darkIconHidden: {
    right: 10
  },
  menuIconHidden: {
    display: 'none'
  },
  img: {
    maxHeight: `${imageHeight}px`
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    justifyContent: 'space-between',
    ...theme.mixins.toolbar,
    paddingRight: '25%'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    },
    alignItems: 'center'
  },
  paper: {
    display: 'flex',
    whiteSpace: 'nowrap',
    flexDirection: 'column',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  paperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7)
    }
  },
  header: {
    paddingTop: '7%'
  },
  hiddenHeader: {
    display: 'none'
  },
  rest: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginTop: imageHeight * 1.6,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    // backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    flex: 1
  },
  closed: {
    width: `calc(100% - ${theme.spacing(7)}px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  logout: {
    margin: theme.spacing(3, 0, 2),
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  },
  grid: {
    height: '80%',
    width: '100%',
    marginTop: '5%'
  },
  link: {
    display: 'flex'
  },
  dark: {
    color: theme.palette.secondary.main
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  },
  infoPaper: {
    marginTop: '20px',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
    maxWidth: '800px',
    maxHeight: '700px',
    display: 'flex'
  },
  infoContent: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    height: '420px',
    margin: 0,
    overflow: 'hidden',
    width: '100.3%'
  },
  tile: {
    '&:hover': {
      filter: 'brightness(115%)'
    }
  },
  title: {
    color: theme.palette.primary.light
  },
  darkTitle: {
    color: theme.palette.secondary.main
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  leftIcon: {
    position: 'absolute',
    zIndex: 1,
    left: '10px',
    top: '3%',
    opacity: 0.8
  },
  rightIcon: {
    position: 'absolute',
    zIndex: 1,
    right: '10px',
    top: '3%',
    opacity: 0.8
  },
  paragraph: {
    textIndent: '20px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '0.6em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey',
      color: '#8a9c8a',
      borderRadius: '10px',
      backgroundColor: '#cbd3cb'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '10px',
      outline: '3px solid black',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      }
    }
  },
  paragraphDark: {
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.light,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark
      }
    }
  },
  list: {
    width: '50%'
  },
  startQuizButton: {
    width: '20%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%'
  }
}))

export default homeStyle

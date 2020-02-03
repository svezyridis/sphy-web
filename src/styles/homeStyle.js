import { makeStyles } from '@material-ui/styles'

export const drawerWidth = 400
const imageHeight = 40

const homeStyle = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey',
      color: '#8a9c8a',
      borderRadius: '10px',
      backgroundColor: '#cbd3cb'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '10px',
      outline: '3px solid black',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      }
    }
  },
  root: {
    margin: 0,
    display: 'flex',
    height: '100%',
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
    position: 'relative',
    marginTop: imageHeight * 1.6,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflow: 'auto',
    flex: 1,
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
    color: theme.palette.info.main
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
    flexDirection: 'column',
    width: '100%'
  },
  gridList: {
    flexWrap: 'nowrap',
    height: '30%',
    minHeight: '120px',
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
    color: '#fff2e6'
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
    top: '5%',
    opacity: 0.8
  },
  rightIcon: {
    position: 'absolute',
    zIndex: 1,
    right: '10px',
    top: '5%',
    opacity: 0.8
  },
  leftThemeIcon: {
    position: 'absolute',
    zIndex: 1,
    left: '10px',
    top: '50%',
    opacity: 0.8
  },
  rightThemeIcon: {
    position: 'absolute',
    zIndex: 1,
    right: '10px',
    top: '50%',
    opacity: 0.8
  },
  paragraph: {
    textIndent: '20px',
    overflowY: 'auto',
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
  },
  questionPaper: {
    width: '80%',
    minWidth: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  formControl: {
    margin: theme.spacing(3)
  },
  button: {
    background: `linear-gradient(45deg, ${theme.palette.secondary.light} 20%, ${theme.palette.secondary.main} 90%)`,
    border: 0,
    borderRadius: 3,
    boxShadow: `0 3px 5px 2px ${theme.palette.primary.main}`,
    color: 'white',
    height: 48,
    padding: '0 30px',
    '&:hover': {
      background: `linear-gradient(45deg, ${theme.palette.secondary.main} 40%, ${theme.palette.secondary.dark} 70%)`,
      boxShadow: `0 3px 5px 2px ${theme.palette.primary.light}`
    }
  },
  input: {
    marginBottom: '10px'
  },
  questionGrid: {
    marginTop: '10%',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  questionCard: {
    minWidth: '500px',
    marginBottom: '5%'
  },
  questionButtonGrid: {
    width: '99%',
    marginBottom: 10,
    marginTop: 10,
    overflow: 'auto',
    maxHeight: '400px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  questionBox: {
    height: 40,
    width: 40,
    background: `linear-gradient(45deg, #a8976e 20%, ${theme.palette.secondary.light} 90%)`,
    borderRadius: 4,
    boxShadow: `0 3px 5px 2px ${theme.palette.primary.main}`,
    color: 'white',
    '&:hover': {
      background: `linear-gradient(45deg, #a8976e 20%, ${theme.palette.secondary.main} 90%)`
    }
  },
  questionBoxAnswered: {
    background: `linear-gradient(45deg, ${theme.palette.primary.light} 40%, ${theme.palette.secondary.main} 90%)`,
    '&:hover': {
      background: `linear-gradient(45deg, ${theme.palette.primary.light} 40%, ${theme.palette.secondary.dark} 70%)`
    }
  },
  reviewBox: {
    height: 40,
    width: 40,
    background: `linear-gradient(45deg, #a8976e 20%, ${theme.palette.secondary.light} 90%)`,
    borderRadius: 4,
    boxShadow: '0 5px 7px 4px #661a00',
    color: 'white',
    '&:hover': {
      background: `linear-gradient(45deg, #a8976e 20%, ${theme.palette.secondary.dark} 90%)`
    }
  },
  reviewBoxCorrect: {
    boxShadow: '0 5px 7px 4px  #004d00'
  },
  correct: {
    color: 'green'
  },
  incorrect: {
    color: 'red'
  },
  correctRadio: {
    '&$checked': {
      color: '#4B8DF8'
    }
  },
  innerTable: {
    paddingLeft: '5%'
  },
  navigationBox: {
    maxHeight: 500
  }
}))

export default homeStyle

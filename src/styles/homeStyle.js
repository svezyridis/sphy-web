import { makeStyles } from '@material-ui/styles'

export const drawerWidth = 400
const imageHeight = 40

const homeStyle = makeStyles(theme => ({
  root: {
    overflowX: 'hidden'
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
    width: `calc(100% - ${drawerWidth + 1}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuIcon: {
    marginLeft: `calc(100% - ${1.7 * imageHeight}px)`
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
    backgroundColor: '#D1D1D1',
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
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  closed: {
    width: `calc(100% - ${theme.spacing(7)}px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
}))

export default homeStyle

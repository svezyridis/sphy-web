import { makeStyles } from '@material-ui/styles'

export const drawerWidth = 400

const drawerStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflowX: 'hidden'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    },
    alignItems: 'center',
    overflowX: 'hidden'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  avatarError: {
    backgroundColor: theme.palette.error.main
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    background: `linear-gradient(45deg, ${theme.palette.secondary.light} 20%, ${theme.palette.secondary.main} 90%)`,
    border: 0,
    borderRadius: 3,
    boxShadow: `0 3px 5px 2px ${theme.palette.primary.main}`,
    color: 'white',
    height: 48,
    padding: '0 30px',
    '&:hover': {
      backgroundColor: `linear-gradient(45deg, ${theme.palette.secondary.main} 20%, ${theme.palette.secondary.dark} 90%)`
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: drawerWidth,
    overflowX: 'hidden'
  },
  signup: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
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
  }
}))

export default drawerStyle

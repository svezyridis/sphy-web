import { makeStyles } from '@material-ui/styles'

const drawerWidth = 300

const drawerStyle = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    },
    alignItems: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#D1D1D1',
    width: drawerWidth
  },
  signup: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  }
}))

export default drawerStyle

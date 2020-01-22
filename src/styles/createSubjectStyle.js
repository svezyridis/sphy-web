import { makeStyles } from '@material-ui/styles'

const createSubjectStyle = makeStyles(theme => ({
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
  dialog: {
    minWidth: '800px',
    maxHeight: '900px'
  },
  input: {
    maxWidth: '300px',
    marginRight: '25px'
  },
  text: {
    marginTop: '20px',
    marginBottom: '15px',
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
  gridList: {
    maxHeight: '100%'
  },
  card: {
    width: '300px',
    height: '250px'
  },
  dropzone: {
    border: '3px',
    borderStyle: 'dashed',
    display: 'inline-block'
  },
  dropzoneActive: {
    borderColor: 'green',
    filter: 'brightness(115%)'
  },
  media: {
    backgroundColor: 'white',
    height: '100%',
    width: 'auto',
    overflow: 'hidden',
    position: 'relative',
    transition: '300ms'
  },
  mediaCaption: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.8,
    width: '100%',
    height: '30px',
    fontSize: '20px',
    fontWeight: 200
  },
  imageList: {
    border: '1px',
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: '5px',
    width: 440,
    height: 340,
    padding: '4px',
    display: 'inline-block',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  label: {
    color: 'white',
    borderColor: 'white',
    position: 'absolute',
    bottom: 0
  },
  icon: {
    color: 'rgba(255,255,255,0.8)'
  },
  tile: {
    position: 'relative',
    height: '100%'
  },
  image: {
    height: '100%',
    position: 'absolute',
    width: '100%'
  },
  actionIcons: {
    position: 'absolute',
    top: 0
  },
  MuiIconButton: {
    backgroundColor: 'red'
  }
}))

export default createSubjectStyle

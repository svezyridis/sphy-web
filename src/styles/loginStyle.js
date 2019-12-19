import { makeStyles } from '@material-ui/styles'

export const drawerWidth = 400

const loginStyle = makeStyles(theme => ({
  spacer: {
    width: `calc(100% - ${drawerWidth}px)`
  }
}))

export default loginStyle

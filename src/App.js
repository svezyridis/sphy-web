import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './App.css'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import LoginContainer from './components/containers/loginContainer'
import HomeContainer from './components/containers/homeContainer'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00416d',
      dark: '#03203d'
    },
    secondary: {
      main: '#e82129'
    }
  },
  typography: {
    useNextVariants: true
  }
})

function App () {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path='/' component={LoginContainer} />
          <Route exact path='/home' component={HomeContainer} />
        </Switch>
      </MuiThemeProvider>
    </Router>
  )
}

export default App

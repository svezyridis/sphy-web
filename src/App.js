import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './App.css'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/login/Login'

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
          <Route exact path='/' component={Login} />
        </Switch>
      </MuiThemeProvider>
    </Router>
  )
}

export default App

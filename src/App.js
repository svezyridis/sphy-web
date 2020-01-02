import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './App.css'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import LoginContainer from './components/containers/loginContainer'
import HomeContainer from './components/containers/homeContainer'
import InfoContainer, { WeaponContainer, CategoryContainer, SubjectContainer } from './components/containers/infoContainer'

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
          <Route exact path='/login' component={LoginContainer} />
          <Route exact path='/' component={HomeContainer} />
          <Route exact path='/info' component={InfoContainer} />
          <Route exact path='/info/:weapon' component={WeaponContainer} />
          <Route exact path='/info/:weapon/:category' component={CategoryContainer} />
          <Route exact path='/info/:weapon/:category/:subject' component={SubjectContainer} />
        </Switch>
      </MuiThemeProvider>
    </Router>
  )
}

export default App

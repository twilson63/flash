import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import Start from './components/start'
import Cards from './components/cards'
import CardForm from './components/cards/form'
import CardShow from './components/cards/show'

const App = props => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Start} />
        <Route path="/cards/new" component={CardForm} />
        <Route path="/cards/:id/edit" component={CardForm} />
        <Route path="/cards/:id" component={CardShow} />
        <Route path="/cards" component={Cards} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>
)

export default App

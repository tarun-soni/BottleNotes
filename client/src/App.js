import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Notes from './components/Notes/Notes'
import Login from './components/Login/Login.js'
import store from './store'
import { Provider } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import PrivateRoute from './components/PrivateRoute'
import Nav from './components/Nav/Nav.js'
import Register from './components/Login/Register'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <Nav />
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/notes" component={Notes} />
            </Switch>
          </div>
        </DndProvider>
      </Router>
    </Provider>
  )
}

export default App

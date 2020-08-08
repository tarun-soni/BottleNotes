import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Notes from './components/Notes/Notes';
import Login from './components/Login/Login.js';
import store from './store'
import { Provider } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import PrivateRoute from './components/PrivateRoute';
import Nav from './components/Nav.js';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser])

  return (

    <Provider store={store}>
      <Router>
        <div className="App" id="login-div">
          <Nav />
          <Route exact path="/" component={Login} />
          <Switch>
            <PrivateRoute exact path='/notes' component={Notes} />
          </Switch>
        </div>
      </Router>
    </Provider >
  );
}

export default App;

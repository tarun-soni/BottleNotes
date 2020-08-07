import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from './components/Nav';
import Notes from './components/Notes/Notes';
import Login from './components/Login/Login.js';
import store from './store'
import { Provider } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'


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
        <div className="App">
          <Nav />
          <Route exact path="/" component={Login} />
          <Switch>
            {/* TODO: make note route private */}
            <Route exact path='/notes' component={Notes} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
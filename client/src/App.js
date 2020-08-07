import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Notes from './components/Notes/Notes';
import Login from './components/Login/Login.js';
import store from './store'
import { Provider } from 'react-redux'


function App() {
  return (

    <Provider store={store}>


      <div className="App">
        <Nav />

        <Login />
        {/* <Notes /> */}
      </div>


    </Provider>
  );
}

export default App;

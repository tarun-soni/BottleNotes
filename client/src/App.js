import React from 'react';
import './App.css';
import Nav from './components/Nav';

import Notes from './components/Notes/Notes';
import Login from './components/Login/Login.js';


function App() {
  return (
    <div className="App">
      <Nav />

      <Login />
      {/* <Notes /> */}
    </div>
  );
}

export default App;

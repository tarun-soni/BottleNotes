import React from 'react'
import PropTypes from 'prop-types'

import './cssLogin.css'

const Login = props => {
  return (
    <>
      <div className="container">
        <form>
          <div className="form-control">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="form-control">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password" />
          </div>

          <button className="btn">Log In</button>

          <small>Don't have an account? <a href="#">Sign up</a></small>
        </form>
        <div className="features">
          <div className="feature">
            <i className="fas fa-database"></i>
            <h3>Store Notes</h3>
            <p>Permanently Store notes and access anytime.</p>
          </div>
          <div className="feature">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h3>Login</h3>
            <p>Login to see and edit all notes.</p>
          </div>

        </div>
      </div>
    </>
  )
}

Login.propTypes = {

}

export default Login

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

import './cssLogin.css'

import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { useDispatch } from 'react-redux'

const Login = ({ isAuthenticated }) => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: 'u1@example.com',
    password: '121212'
  })

  const { email, password } = formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch(login(formData))
  }
  if (isAuthenticated) {
    return <Redirect to="/notes" />
  }

  return (
    <>
      <div className="container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="btn" value="Log In" />
          <small>
            Don't have an account? <Link to={'/register'}>Sign up </Link>
          </small>
        </form>
        <div className="features">
          <div className="feature">
            <i className="fas fa-database"></i>
            <h3>Store Notes</h3>
            <p>Permanently Store notes and access anytime.</p>
          </div>
          <div className="feature">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h3>Sign up and Login</h3>
            <p>Login to see and edit all notes.</p>
          </div>
        </div>
      </div>
    </>
  )
}
Login.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Login)

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'

import { register } from '../../actions/auth'
const Register = ({ isAuthenticated }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch(register(formData))
  }

  if (isAuthenticated) {
    return <Redirect to="/notes" />
  }

  return (
    <>
      <div className="container">
        <div className="form-control">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-control">
              <label htmlFor="Name">Name</label>

              <input
                type="text"
                placeholder="Enter your Name"
                name="name"
                id="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                autoComplete="off"
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password (min. length 6)"
                name="password"
                autoComplete="new-password"
                minLength="6"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type="submit" className="btn" value="Register" />
          </form>
        </div>
      </div>
    </>
  )
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Register)

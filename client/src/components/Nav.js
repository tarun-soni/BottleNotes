import React from 'react'
import '../App.css'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import { connect, } from 'react-redux'
import { logout } from '../actions/auth';

const Nav = ({ auth: { isAuthenticated, isLoading } }) => {
  const dispatch = useDispatch()

  const logoutFunc = () => {
    dispatch(logout())
    return <Redirect to="/" />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  const authLinks = (
    <ul>

      <li>
        <a
          onClick={logoutFunc}
          href="#!">
          <i className="fas fa-sign-out-alt"></i>{'  '}
          <span className="hide-sm"> Logout </span>
        </a>
      </li>
    </ul >
  )
  return (
    <>

      <nav className="navbar bg-dark">
        <h1>
          <Link to='/'> BottleNotes</Link>
        </h1>

        {
          isLoading ? ' ' : (
            <>
              {isAuthenticated ? authLinks : ''}
            </>
          )
        }
      </nav>
    </>

  )
}


Nav.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Nav);
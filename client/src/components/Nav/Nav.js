import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import Switch from 'react-switch'
import './Navcss.css'
import useWindowSize from '../../utils/useWindowSize'
import { updateSwitchState } from '../../actions/notes'
const Nav = ({ auth: { isAuthenticated, isLoading } }) => {
  const dispatch = useDispatch()
  const [switchChecked, setSwitchChecked] = useState(false)

  const size = useWindowSize()

  const onSwitchStateChange = (state) => {
    dispatch(updateSwitchState(state))
    setSwitchChecked(state)
  }

  const logoutFunc = () => {
    dispatch(logout())
    return <Redirect to="/" />
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />
  }
  const authLinks = (
    <ul>
      <li>
        <a onClick={logoutFunc} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          {'  '}
          <span className="hide-sm"> Logout </span>
        </a>
      </li>
    </ul>
  )
  return (
    <>
      <nav className="navbar">
        <h1>
          <Link to="/"> BottleNotes</Link>
        </h1>
        <div style={{ display: 'flex' }}>
          {size.width > 768 ? (
            <>
              <span style={{ color: 'white', margin: '0 1rem' }}>
                Trello mode
              </span>
              <div>
                <Switch
                  onChange={() => onSwitchStateChange(!switchChecked)}
                  checked={switchChecked}
                />
              </div>
            </>
          ) : (
            <></> // setSwitchChecked(false)
          )}
          {isLoading ? ' ' : <>{isAuthenticated ? authLinks : ''}</>}
        </div>
      </nav>
    </>
  )
}

Nav.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Nav)

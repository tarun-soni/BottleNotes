import axios from 'axios'
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_NOTES, REGISTER_SUCCESS
} from './types'
import setAuthToken from '../utils/setAuthToken'

//Register User

export const register = (dataToRegister) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const { name, email, password } = dataToRegister
  try {

    const res = await axios.post('/api/users', dataToRegister, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.map(error => window.alert(error.msg))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }

}

// LOGIN USER
export const login = (dataFromUser) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  // const body = JSON.stringify({ name, email, password })
  try {
    const res = await axios.post('/api/auth', dataFromUser, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data //response.data is token coz we get token back after reg
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log('errors :>> ', errors);
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

//LOAD USER
export const loadUser = () => async dispatch => {
  //check if there's a token
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    console.error('error in loadUser', err)
    dispatch({
      type: AUTH_ERROR
    })
  }
}

//Logout
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_NOTES });
  dispatch({ type: LOGOUT });
};

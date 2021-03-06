import axios from 'axios'
import {
  GET_NOTES,
  NOTES_ERROR,
  CREATE_NOTE,
  UPDATE_NOTES,
  DELETE_NOTE,
  UPDATE_SWITCH
} from './types'

//get current users notes
export const getCurrentUsersNotes = () => async (dispatch) => {
  try {
    const res = await axios.get('./api/note/notes')
    dispatch({
      type: GET_NOTES,
      payload: res.data //notes
    })
  } catch (err) {
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response, status: err.response.status }
    })
  }
}

// Delete note
export const deleteNote = (noteid) => async (dispatch) => {
  try {
    await axios.delete(`/api/note/${noteid}`)

    dispatch({
      type: DELETE_NOTE,
      payload: noteid
    })
  } catch (err) {
    console.log('err in delte notes :>> ', err)
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Add note
export const addNote = (dataFromUser) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post(`/api/note`, dataFromUser, config)

    dispatch({
      type: CREATE_NOTE,
      payload: res.data
    })
  } catch (err) {
    console.log('err in add notes :>> ', err)
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// update note
export const updateNote = (dataFromUser, noteid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(`/api/note/${noteid}`, dataFromUser, config)
    // window.alert("Note Udated");
    dispatch({
      type: UPDATE_NOTES,
      payload: res.data
    })
  } catch (err) {
    console.log('err in update notes :>> ', err)
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const updateSwitchState = (switchState) => async (dispatch) => {
  dispatch({
    type: UPDATE_SWITCH,
    payload: switchState
  })
}



import axios from 'axios'
import {
  GET_NOTES,
  NOTES_ERROR,
  CREATE_NOTE,
  UPDATE_NOTES,
  NOTE_DELETED
} from './types'

//get current users notes
export const getCurrentUsersNotes = () => async dispatch => {

  try {
    const res = await axios.get('./api/note/notes')
    console.log('res.data :>> ', res.data.notes);
    dispatch({
      type: GET_NOTES,
      payload: res.data  //notes
    })
  } catch (err) {
    // console.log("err in getting notes", err)
    // dispatch({
    //   type: NOTES_ERROR,
    // })
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response, status: err.response.status }
    })
  }
}


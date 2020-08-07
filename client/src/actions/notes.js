

import axios from 'axios'
import {
  GET_NOTES,
  NOTES_ERROR,
  CREATE_NOTE,
  UPDATE_NOTES,
  DELETE_NOTE
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


// Delete note
export const deleteNote = (noteid) => async dispatch => {
  try {
    const res = await axios.delete(`/api/note/${noteid}`);

    dispatch({
      type: DELETE_NOTE,
      payload: noteid
    });
  } catch (err) {
    console.log('err in delte notes :>> ', err);
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
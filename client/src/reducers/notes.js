import {
  GET_NOTES,
  NOTES_ERROR,
  CREATE_NOTE,
  UPDATE_NOTES,
  DELETE_NOTE,
  CLEAR_NOTES
} from '../actions/types'

const initialState = {
  note: null,
  notes: [],
  loading: true,
  error: {}
}


export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        note: payload,
        notes: payload.notes,
        loading: false
      }
    case NOTES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }

    case DELETE_NOTE:
      return {
        ...state,
        notes: {
          ...state.note,
          notes: state.notes.filter(
            n => n._id !== payload
          )
        },
        notes: state.notes
      }
    case CLEAR_NOTES:
      return {
        ...state,
        note: null,
        notes: [],
        loading: false,
      }

    case CREATE_NOTE:
      return {
        ...state,
        notes: [payload, ...state.notes],
        loading: false,
      }
    case UPDATE_NOTES:
      return {
        ...state,
        notes: [state.notes]
      }
    default:
      return state;
  }
}

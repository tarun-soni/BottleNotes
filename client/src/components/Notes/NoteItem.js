import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../../actions/notes'

const NoteItem = ({ n, name }) => {

  const dispatch = useDispatch()
  return (
    <>

      <div className="note">
        <div className="note-body">
          <h4>{n.title}</h4>
          <p>{n.desc}</p>
          <div className="user">
            <div className="user-info">
              <h5>created by {name}</h5>
            </div>


            <i onClick={e =>
              dispatch(deleteNote(n._id))
            }
              className="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </>
  )
}



export default NoteItem

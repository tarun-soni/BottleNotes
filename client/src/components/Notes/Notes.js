
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getCurrentUsersNotes } from '../../actions/notes'
import './cssNotes.css'
import NoteItem from './NoteItem'
const Notes = ({ notes: { note, notes, loading } }) => {


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrentUsersNotes())
  }, [getCurrentUsersNotes, notes])

  return (

    <div className="main">


      <form className="inputFields"
      >
        <input
          type="text"
          placeholder="Title..."
          name="email"
        />


        <input
          type="text"
          placeholder="description"
          name="password"
          minLength="6"
        />
        <input type="submit" className="btn" value="ADD Note" />
      </form>


      <div className="notes-container">


        {loading ? <h1> loading.....</h1> :
          <>
            {notes.map(n => (
              <NoteItem key={n._id} n={n} name={note.user.name} />
            ))}
          </>
        }
      </div>

    </div>
  )
}


const mapStateToProps = state => ({
  notes: state.notes
})

export default connect(mapStateToProps)(Notes)
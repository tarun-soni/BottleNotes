import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getCurrentUsersNotes, addNote } from '../../actions/notes'
import Homepage from '../DnD/Homepage'
import './cssNotes.css'
import Switch from 'react-switch'

import NoteItem from './NoteItem'
const Notes = ({ notes: { note, notes, loading } }) => {
  const dispatch = useDispatch()
  const [switchChecked, setSwitchChecked] = useState(false)

  useEffect(() => {
    dispatch(getCurrentUsersNotes())
    // }, [getCurrentUsersNotes, notes, dispatch])
  }, [notes, dispatch])

  const [noteData, setnoteData] = useState({
    title: '',
    desc: ''
  })

  const { title, desc } = noteData
  const onChange = (e) =>
    setnoteData({ ...noteData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addNote(noteData))
    setnoteData({
      title: '',
      desc: ''
    })
  }
  return (
    <div className="main">
      <form
        className={
          !switchChecked ? 'inputFields inputFields-notes-mode' : 'inputFields'
        }
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          type="text"
          placeholder="Title..."
          name="title"
          value={title}
          onChange={(e) => onChange(e)}
        />

        <input
          type="text"
          placeholder="description"
          name="desc"
          value={desc}
          onChange={(e) => onChange(e)}
        />
        <input type="submit" className="btn" value="ADD Note" />
      </form>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span style={{ padding: '0 1rem' }}>Trello / Timeline mode</span>
        <Switch
          onChange={() => setSwitchChecked(!switchChecked)}
          checked={switchChecked}
        />
      </div>
      <div className={!switchChecked && 'notes-container '}>
        {loading ? (
          <h1> loading.....</h1>
        ) : switchChecked ? (
          <Homepage data={notes} />
        ) : (
          notes.map((n) => <NoteItem key={n._id} n={n} name={note.user.name} />)
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  notes: state.notes
})

export default connect(mapStateToProps)(Notes)

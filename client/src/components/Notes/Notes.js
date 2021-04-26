import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getCurrentUsersNotes, addNote } from '../../actions/notes'
import Homepage from '../DnD/Homepage'
import './cssNotes.css'
import {
  Container as FloatingContainer,
  Button as FloatingButton
} from 'react-floating-action-button'
import NoteItem from './NoteItem'

import CustomModal from '../CustomModal'
const Notes = ({ notes: { note, notes, loading, switchState } }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrentUsersNotes())

    // }, [getCurrentUsersNotes, notes, dispatch])
  }, [notes, dispatch])

  const [noteData, setnoteData] = useState({
    title: '',
    desc: ''
  })

  const [modalIsOpen, setIsOpen] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addNote(noteData))
    setnoteData({
      title: '',
      desc: ''
    })
    setIsOpen(false)
  }
  return (
    <>
      <div className="main">
        {modalIsOpen && (
          <CustomModal
            modalIsOpen={modalIsOpen}
            newValue={noteData}
            setnewValues={setnoteData}
            onSubmit={onSubmit}
            setIsOpen={setIsOpen}
            add
          />
        )}

        <div className={!switchState && 'notes-container '}>
          {loading ? (
            <h1> loading.....</h1>
          ) : switchState ? (
            <Homepage data={notes} />
          ) : (
            notes.map((n) => (
              <NoteItem key={n._id} n={n} name={note.user.name} />
            ))
          )}
        </div>
      </div>

      <FloatingContainer>
        <FloatingButton
          tooltip="Add Transaction"
          onClick={() => setIsOpen(true)}
        >
          <AddSvg />
        </FloatingButton>
      </FloatingContainer>
    </>
  )
}

const mapStateToProps = (state) => ({
  notes: state.notes
})

export default connect(mapStateToProps)(Notes)
const AddSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <title>add</title>
      <path d="M16 9h-5V4H9v5H4v2h5v5h2v-5h5V9z" />
    </svg>
  )
}

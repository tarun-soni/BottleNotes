import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { deleteNote, updateNote } from '../../actions/notes'
import CustomModal from '../CustomModal'

const NoteItem = ({ n, name }) => {
  const dispatch = useDispatch()

  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  const [newValue, setnewValues] = useState({
    title: n.title,
    desc: n.desc
  })

  // const onChange = e => setnoteData({ ...n, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateNote(newValue, n._id))
    setIsOpen(false)
  }
  return (
    <>
      <div className="note">
        <div className="note-body">
          <h4>{n.title}</h4>
          <p>{n.desc}</p>
          <h5>STATUS: {n?.status}</h5>
          <div className="user" style={{ margin: '1rem 0' }}>
            <div className="user-info">
              <h5>created by {name}</h5>
            </div>

            <div className="icon">
              <i onClick={openModal} className="fa fa-pencil"></i>
              <i
                onClick={(e) => dispatch(deleteNote(n._id))}
                className="fa fa-trash"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        modalIsOpen={modalIsOpen}
        newValue={newValue}
        setnewValues={setnewValues}
        onSubmit={onSubmit}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

export default NoteItem

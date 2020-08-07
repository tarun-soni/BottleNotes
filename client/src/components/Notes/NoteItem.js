import React from 'react'
import PropTypes from 'prop-types'

const NoteItem = ({ n, name }) => {
  return (
    <>
      <div className="notes-container">

        <div className="note">
          <div className="note-body">
            <h4>{n.title}</h4>
            <p>{n.desc}</p>
            <div className="user">
              <div className="user-info">
                <h5>created by {name}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



export default NoteItem

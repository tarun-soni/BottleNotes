import React from 'react'
import PropTypes from 'prop-types'

import './cssNotes.css'
const Notes = props => {
  return (
    <>
      <div class="notes-container">
        <div class="note">
          <div class="note-body">
            <h4>Note title</h4>
            <p>note desc.</p>
            <div class="user">
              <div class="user-info">
                <h5>username</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

Notes.propTypes = {

}

export default Notes

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteNote, updateNote } from '../../actions/notes'
import Modal from 'react-modal';

const NoteItem = ({ n, name }) => {

  const dispatch = useDispatch()


  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#000';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '50%',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const [newValue, setnewValues] = useState({
    title: n.title,
    desc: n.desc
  })

  // const onChange = e => setnoteData({ ...n, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault()
    dispatch(updateNote(newValue, n._id))
  }
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

            <div className="icon">

              <i onClick={openModal} className="fa fa-pencil" ></i>
              <i onClick={e =>
                dispatch(deleteNote(n._id))
              }
                className="fa fa-trash" aria-hidden="true"></i>
              <Modal></Modal>
            </div>
          </div>
        </div>
      </div>


      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="modal-div">

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Note</h2>
          <i className="fa fa-times" onClick={closeModal} aria-hidden="true"></i>

        </div>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={newValue.title}
            name="title"
            onChange={e => setnewValues({
              ...newValue,
              title: e.target.value
            })}
          />

          <input
            type="text"
            name="desc"
            value={newValue.desc}
            onChange={e => setnewValues({
              ...newValue,
              desc: e.target.value
            })}
          />
          <button className="btn">Save</button>
        </form>
      </Modal>
    </>
  )
}



export default NoteItem

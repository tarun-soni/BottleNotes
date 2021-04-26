import React from 'react'
import Modal from 'react-modal'

export default function CustomModal(props) {
  function afterOpenModal() {
    subtitle.style.color = '#000'
  }

  function closeModal() {
    props.setIsOpen(false)
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
  }
  var subtitle
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="modal-div">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          {props.add ? 'Add' : 'Edit'} Note
        </h2>
        <i className="fa fa-times" onClick={closeModal} aria-hidden="true"></i>
      </div>

      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          value={props.newValue.title}
          name="title"
          onChange={(e) =>
            props.setnewValues({ ...props.newValue, title: e.target.value })
          }
        />

        <input
          type="text"
          name="desc"
          value={props.newValue.desc}
          onChange={(e) =>
            props.setnewValues({ ...props.newValue, desc: e.target.value })
          }
        />
        <button className="btn">Save</button>
      </form>
    </Modal>
  )
}

import React from 'react';

function DeleteModal({ visible, handleDelete, toggleModal, message }) {
  const showHideClassName = visible ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <div className="modal-content">
        <div className="message">
          <p>{message}</p>
        </div>
        <div className="controls">
          <button className="btn comment-btn" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn comment-btn" onClick={() => toggleModal()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

import React from 'react';
import './Modals.scss';

const Modal = ({ isOpen, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Notification</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

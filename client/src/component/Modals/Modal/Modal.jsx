import React from 'react';
import './Modal.scss';

const Modal = ({ isOpen, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal">
        <div className="modal__header">
          <h2>Notification</h2>
          <button className="modal__close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal__body">
          <p>{message}</p>
        </div>
        <div className="modal__footer">
          <button className="modal__confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="modal__cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

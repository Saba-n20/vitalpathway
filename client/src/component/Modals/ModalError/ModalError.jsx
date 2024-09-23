import React from 'react';
import './ModalError.scss';

const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <h3>Error</h3>
        <p className='modal__msg'>{message}</p>
        <button className="modal__close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';
import './SuccessModal.scss';

const SuccessModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Success</h2>
        <p className='modal__txt'>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default SuccessModal;

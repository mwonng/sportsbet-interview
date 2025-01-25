import React from 'react';

function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>
        {title && <h2 className="modal-title font-bold text-xl pb-6">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Modal; 
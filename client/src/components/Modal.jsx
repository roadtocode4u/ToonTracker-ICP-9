import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-gray-400/70 fixed top-0 left-0 w-full min-h-screen flex justify-center items-center z-10">
      <div className="bg-white p-10 rounded-md  z-50 relative">
        <span className="absolute top-2 right-2 text-sm" onClick={onClose}>
          Close
        </span>
        {children}
      </div>
    </div>
  );
}

export default Modal;

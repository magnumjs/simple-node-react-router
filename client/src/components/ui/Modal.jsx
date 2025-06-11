import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
        <button className="float-right text-gray-500" onClick={onClose}>
          ✕
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

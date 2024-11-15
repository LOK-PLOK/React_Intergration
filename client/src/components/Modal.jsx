import React from 'react';

const Modal = ({ isOpen, onClose, title, content, onTitleChange, onContentChange, onSave, onDelete, mode }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition"
        >
          &times;
        </button>
        {mode === 'delete' ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Are you sure you want to delete this note?</h2>
            <div className="flex justify-between">
              <button
                onClick={onDelete}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">{mode === 'edit' ? 'Edit Note' : 'Create Note'}</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={onTitleChange}
              className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={onContentChange}
              className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex justify-between">
              <button
                onClick={onSave}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                {mode === 'edit' ? 'Edit Note' : 'Create Note'}
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
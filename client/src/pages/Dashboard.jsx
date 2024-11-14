import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/unauthorized');
    } else {
      fetchNotes();
    }
  }, [navigate]);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/notes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setNotes(data);
    } else {
      navigate('/unauthorized');
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const text = await response.text(); // Get the raw response text
      console.log('Raw response:', text); // Log the raw response text

      if (!text) {
        throw new Error('Empty response from server');
      }

      let data;
      try {
        data = JSON.parse(text); // Parse the raw response text as JSON
      } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Invalid JSON response from server');
      }

      if (response.ok) {
        fetchNotes();
        setTitle('');
        setContent('');
      } else {
        console.error('Error creating note:', data);
        alert('Error creating note: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Error creating note: ' + error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/notes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      fetchNotes();
    } else {
      alert('Error deleting note');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-center">Dashboard</h2>
      <form onSubmit={handleCreateNote} className="mb-6 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-3 w-full rounded hover:bg-blue-600 transition">
          Create Note
        </button>
      </form>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{note.title}</h3>
            <p className="mt-2">{note.content}</p>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="bg-red-500 text-white p-2 mt-4 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
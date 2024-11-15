import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateNoteModal from "../components/CreateNoteModal";
import EditNoteModal from "../components/EditNoteModal";
import DeleteNoteModal from "../components/DeleteNoteModal";
import ViewNoteModal from "../components/ViewNoteModal"; // Import the ViewNoteModal component

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null); // State to track the note being edited
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State to control create modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control delete modal visibility
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State to control view modal visibility
  const [selectedNote, setSelectedNote] = useState(null); // State to store the selected note's details
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
    } else {
      fetchNotes();
    }
  }, [navigate, token]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/notes", {
        headers: {
          Authorization: token,
        },
      });
      console.log("Response:", response); // Log the response
      if (response.status === 200) {
        setNotes(response.data);
      } else {
        console.error("Error fetching notes:", response.data);
        navigate("/unauthorized");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      navigate("/unauthorized");
    }
  };

  const handleCreateNote = async () => {
    try {
      const response = await axios.post(
        "/notes",
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log("Response:", response); // Log the response

      if (response.status === 201) {
        fetchNotes();
        setTitle("");
        setContent("");
        setEditId(null); // Reset editId after creating a note
        closeCreateModal();
      } else {
        console.error("Error creating note:", response.data);
        alert(
          "Error creating note: " + (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error creating note:", error);
      alert(
        "Error creating note: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const handleUpdateNote = async () => {
    try {
      const response = await axios.put(
        `/notes/${editId}`,
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log("Response:", response); // Log the response

      if (response.status === 200) {
        fetchNotes();
        setTitle("");
        setContent("");
        setEditId(null); // Reset editId after updating a note
        closeEditModal();
      } else {
        console.error("Error updating note:", response.data);
        alert(
          "Error updating note: " + (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error updating note:", error);
      alert(
        "Error updating note: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const handleDeleteNote = async () => {
    try {
      const response = await axios.delete(`/notes/${selectedNote.id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        fetchNotes();
        closeDeleteModal();
      } else {
        alert("Error deleting note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert(
        "Error deleting note: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const handleEditNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
    setIsEditModalOpen(true);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const handleAddNoteClick = () => {
    setTitle("");
    setContent("");
    setEditId(null);
    setIsCreateModalOpen(true);
  };

  const handleDeleteClick = (note) => {
    setSelectedNote(note);
    setIsDeleteModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-center">Dashboard</h2>
      <button
        onClick={handleAddNoteClick}
        className="bg-blue-500 text-white rounded-full px-5 py-3 hover:bg-blue-600 transition mb-6"
      >
        +
      </button>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-5">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transition relative w-80" // Set a fixed width for the card
              onClick={() => handleNoteClick(note)}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(note);
                }}
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p className="mt-2 truncate mb-10">{note.content}</p>{" "}
              {/* Truncate the content */}
              <button
                className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditNote(note);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title={title}
        content={content}
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onSave={handleCreateNote}
      />
      <EditNoteModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title={title}
        content={content}
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onSave={handleUpdateNote}
      />
      <DeleteNoteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteNote}
      />
      <ViewNoteModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        title={selectedNote?.title}
        content={selectedNote?.content}
      />
    </div>
  );
}

export default Dashboard;

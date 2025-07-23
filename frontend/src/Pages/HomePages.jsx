import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import api from "../lib/axios.js";
import NotesNotFound from "../components/NotesNotFound.jsx";


const HomePages = () => {
  const [isRateLimited, setRateLimited] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [notes, setNotes] = React.useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error.response || error.message || error);
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar/>
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
        {notes.length === 0  && !isRateLimited && <NotesNotFound/> }
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePages;

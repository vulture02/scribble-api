import axios from 'axios';
import { ArrowBigLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowBigLeftIcon className="size-5" />
            Back to Home
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold mb-4">Create a New Note</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter note title"
                    className="input input-bordered rounded-2xl"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Enter your note..."
                    className="textarea textarea-bordered rounded-2xl h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary rounded-2xl" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

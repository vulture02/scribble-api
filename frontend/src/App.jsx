import React from 'react';
import HomePages from './Pages/HomePages';
import CreatePage from './Pages/CreatePage';
import NoteDetailPage from './Pages/NoteDetailPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 -z-10 h-full w-full px-5 py-24"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000000 60%, #00FF9D66 100%)",
        }}
      />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;

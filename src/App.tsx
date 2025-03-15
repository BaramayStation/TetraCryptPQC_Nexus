
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Enterprise from '@/pages/Enterprise';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enterprise" element={<Enterprise />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

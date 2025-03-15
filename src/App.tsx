import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Documentation from './pages/Documentation';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Security from './pages/Security';
import Enterprise from './pages/Enterprise';
import TetraCryptNexus from './pages/TetraCryptNexus';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/security" element={<Security />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/tetracrypt-nexus" element={<TetraCryptNexus />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

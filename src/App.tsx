
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Chat from "@/pages/Chat";
import Settings from "@/pages/Settings";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="tetracrypt-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

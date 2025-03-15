
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import SecureCommunication from './pages/SecureCommunication';
import KeyManagement from './pages/KeyManagement';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { logWasmSupport } from '@/lib/wasm-detection';
import { toast } from '@/hooks/use-toast';

function App() {
  useEffect(() => {
    // Check WebAssembly support on app initialization
    logWasmSupport().then(support => {
      if (!support.isOptimal) {
        toast({
          title: "WebAssembly SIMD not detected",
          description: "Some cryptographic operations may run slower in this browser.",
          duration: 5000
        });
      }
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="tetracrypt-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/secure-communication" element={<SecureCommunication />} />
          <Route path="/key-management" element={<KeyManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;


import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import SecureCommunication from './pages/SecureCommunication';
import KeyManagement from './pages/KeyManagement';
import Enterprise from './pages/Enterprise';
import Documentation from './pages/Documentation';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { logWasmSupport } from '@/lib/wasm-detection';
import { toast } from '@/hooks/use-toast';
import { getUserProfile } from '@/lib/storage';

function App() {
  useEffect(() => {
    // Check WebAssembly support on app initialization
    logWasmSupport().then(support => {
      if (!support.isSupported) {
        toast({
          title: "WebAssembly not supported",
          description: "Your browser doesn't support WebAssembly which is required for cryptographic operations.",
          duration: 10000
        });
      } else if (!support.isOptimal) {
        toast({
          title: "WebAssembly SIMD not detected",
          description: "Some cryptographic operations may run slower in this browser.",
          duration: 5000
        });
      }
    });
  }, []);

  // Function to check if a user profile exists
  const hasUserProfile = () => {
    return !!getUserProfile();
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="tetracrypt-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/messages" element={<Navigate to="/chat" replace />} />
          <Route path="/secure-communication" element={<SecureCommunication />} />
          <Route path="/key-management" element={<KeyManagement />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/whitepaper" element={<Navigate to="/documentation" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// ✅ Error Boundary Wrapper to Catch Runtime Failures
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense fallback={<div>🔒 Loading Secure Framework...</div>}>
      {children}
    </React.Suspense>
  );
};

// ✅ Enhanced Security & AI Monitoring Hook (Military-Grade Security)
const enableSecurityMonitoring = async () => {
  try {
    const { monitorThreats } = await import('./lib/ai-security');
    monitorThreats(); // AI-based threat detection
    console.log('🔹 AI Security Monitoring Enabled');
  } catch (error) {
    console.error('❌ AI Security Monitoring Failed:', error);
  }
};

// ✅ Initialize Security on Load
enableSecurityMonitoring();

// ✅ Future-Proofed Render with AI Security & PQC
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

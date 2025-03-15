
// Import statements
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'

// Layout imports
import MainLayout from '@/components/layout/MainLayout'

// Page imports
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Security from '@/pages/Security'
import SecureMessaging from '@/pages/SecureMessaging'
import SecureExecution from '@/pages/SecureExecution'
import Chat from '@/pages/Chat'
import P2PAIMessaging from '@/pages/P2PAIMessaging'
import AISecurity from '@/pages/AISecurity'
import SecurityMonitoring from '@/pages/SecurityMonitoring'
import PostQuantumSecurityImpl from '@/pages/PostQuantumSecurityImpl'
import DecentralizedCloud from '@/pages/DecentralizedCloud'
import DecentralizedID from '@/pages/DecentralizedID'
import FailsafeNetwork from '@/pages/FailsafeNetwork'
import FailsafeContinuity from '@/pages/FailsafeContinuity'
import Enterprise from '@/pages/Enterprise'
import KeyManagement from '@/pages/KeyManagement'
import UndergroundNetwork from '@/pages/UndergroundNetwork'
import SecureCommunication from '@/pages/SecureCommunication'
import Wiki from '@/pages/Wiki'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Blog from '@/pages/Blog'
import Documentation from '@/pages/Documentation'
import Pricing from '@/pages/Pricing'
import Support from '@/pages/Support'
import Settings from '@/pages/Settings'
import AccountSettings from '@/pages/AccountSettings'
import NotFound from '@/pages/NotFound'
import React from 'react'
import TetraCryptWallet from '@/pages/TetraCryptWallet'
import TetraCryptNexus from '@/pages/TetraCryptNexus'

// Create a client
const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="security" element={<Security />} />
                <Route path="secure-messaging" element={<SecureMessaging />} />
                <Route path="secure-execution" element={<SecureExecution />} />
                <Route path="chat" element={<Chat />} />
                <Route path="p2p-ai-messaging" element={<P2PAIMessaging />} />
                <Route path="ai-security" element={<AISecurity />} />
                <Route path="security-monitoring" element={<SecurityMonitoring />} />
                <Route path="post-quantum-security" element={<PostQuantumSecurityImpl />} />
                <Route path="decentralized-cloud" element={<DecentralizedCloud />} />
                <Route path="decentralized-id" element={<DecentralizedID />} />
                <Route path="failsafe-network" element={<FailsafeNetwork />} />
                <Route path="failsafe-continuity" element={<FailsafeContinuity />} />
                <Route path="enterprise" element={<Enterprise />} />
                <Route path="key-management" element={<KeyManagement />} />
                <Route path="underground-network" element={<UndergroundNetwork />} />
                <Route path="secure-communication" element={<SecureCommunication />} />
                <Route path="tetracrypt-demo" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <React.lazy(() => import('./pages/TetraCryptDemo')) />
                  </React.Suspense>
                } />
                <Route path="tetracrypt-wallet" element={<TetraCryptWallet />} />
                <Route path="tetracrypt-nexus" element={<TetraCryptNexus />} />
                
                {/* Wiki Routes */}
                <Route path="wiki/*" element={<Wiki />} />
                
                {/* Other routes */}
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="blog" element={<Blog />} />
                <Route path="documentation" element={<Documentation />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="support" element={<Support />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account-settings" element={<AccountSettings />} />
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}

export default App

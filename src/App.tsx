
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Enterprise from './pages/Enterprise';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';
import Support from './pages/Support';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AccountSettings from './pages/AccountSettings';
import KeyManagement from './pages/KeyManagement';
import AISecurity from './pages/AISecurity';
import DecentralizedID from './pages/DecentralizedID';
import SecureExecution from './pages/SecureExecution';
import P2PAIMessaging from './pages/P2PAIMessaging';
import Wiki from './pages/Wiki';
import PostQuantumSecurityImpl from './pages/PostQuantumSecurityImpl';
import Index from './pages/Index';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Import wiki pages
import AIEthics from './pages/wiki/ai/AIEthics';
import AIGovernance from './pages/wiki/ai/AIGovernance';
import AISecurityModels from './pages/wiki/ai/AISecurityModels';
import FederatedLearning from './pages/wiki/ai/FederatedLearning';
import AnomalyDetection from './pages/wiki/ai/AnomalyDetection';
import CloudInfrastructure from './pages/wiki/enterprise/CloudInfrastructure';
import ComplianceFrameworks from './pages/wiki/enterprise/ComplianceFrameworks';
import EnterpriseGovernance from './pages/wiki/enterprise/EnterpriseGovernance';
import SecureSupplyChain from './pages/wiki/enterprise/SecureSupplyChain';
import MilitarySecurity from './pages/wiki/military/MilitarySecurity';
import TacticalComms from './pages/wiki/military/TacticalComms';
import BattlefieldEncryption from './pages/wiki/military/BattlefieldEncryption';
import ZeroTrustArchitecture from './pages/wiki/military/ZeroTrustArchitecture';
import CyberWarfare from './pages/wiki/military/CyberWarfare';
import TetraCrypt2025Vision from './pages/wiki/roadmap/TetraCrypt2025Vision';
import FailsafeContinuity from "./pages/FailsafeContinuity";

// Wiki space pages
import Helium3Economy from './pages/lunar/Helium3Economy';
import Helium3Mining from './pages/wiki/lunar/Helium3Mining';
import AsteroidMining from './pages/wiki/space/AsteroidMining';
import SpaceEconomy from './pages/wiki/space/SpaceEconomy';

// Create a Query Client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="tetracrypt-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Dashboard Routes - Requires Authentication */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/key-management" element={<KeyManagement />} />
            <Route path="/ai-security" element={<AISecurity />} />
            <Route path="/decentralized-id" element={<DecentralizedID />} />
            <Route path="/secure-execution" element={<SecureExecution />} />
            <Route path="/p2p-ai-messaging" element={<P2PAIMessaging />} />
            <Route path="/post-quantum-security" element={<PostQuantumSecurityImpl />} />
            <Route path="/failsafe-continuity" element={<FailsafeContinuity />} />
            
            {/* Wiki Routes */}
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/wiki/ai/aiethics" element={<AIEthics />} />
            <Route path="/wiki/ai/aigovernance" element={<AIGovernance />} />
            <Route path="/wiki/ai/aisecuritymodels" element={<AISecurityModels />} />
            <Route path="/wiki/ai/federatedlearning" element={<FederatedLearning />} />
            <Route path="/wiki/ai/anomalydetection" element={<AnomalyDetection />} />
            
            <Route path="/wiki/enterprise/cloudinfrastructure" element={<CloudInfrastructure />} />
            <Route path="/wiki/enterprise/complianceframeworks" element={<ComplianceFrameworks />} />
            <Route path="/wiki/enterprise/enterprisegovernance" element={<EnterpriseGovernance />} />
            <Route path="/wiki/enterprise/securesupplychain" element={<SecureSupplyChain />} />
            
            <Route path="/wiki/military/militarysecurity" element={<MilitarySecurity />} />
            <Route path="/wiki/military/tacticalcomms" element={<TacticalComms />} />
            <Route path="/wiki/military/battlefieldencryption" element={<BattlefieldEncryption />} />
            <Route path="/wiki/military/zerotrustarchitecture" element={<ZeroTrustArchitecture />} />
            <Route path="/wiki/military/cyberwarfare" element={<CyberWarfare />} />
            
            {/* Lunar and Space Economy Routes */}
            <Route path="/lunar/helium3-economy" element={<Helium3Economy />} />
            <Route path="/wiki/lunar/helium3mining" element={<Helium3Mining />} />
            <Route path="/wiki/space/asteroidmining" element={<AsteroidMining />} />
            <Route path="/wiki/space/spaceeconomy" element={<SpaceEconomy />} />
            
            {/* Roadmap Route */}
            <Route path="/wiki/roadmap/tetracrypt2025vision" element={<TetraCrypt2025Vision />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

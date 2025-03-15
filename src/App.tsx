
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Enterprise from '@/pages/Enterprise';
import WikiLayout from '@/pages/wiki/WikiLayout';
import WikiHome from '@/pages/wiki/WikiHome';
import NotFound from '@/pages/NotFound';

// Import category pages
import CryptographyCategory from '@/pages/wiki/cryptography/CryptographyCategory';
import SecurityCategory from '@/pages/wiki/security/SecurityCategory';
import IdentityCategory from '@/pages/wiki/identity/IdentityCategory';
import EnterpriseCategory from '@/pages/wiki/enterprise/EnterpriseCategory';
import AICategory from '@/pages/wiki/ai/AICategory';
import MilitaryCategory from '@/pages/wiki/military/MilitaryCategory';
import DevCategory from '@/pages/wiki/development/DevCategory';

// Import cryptography subpages
import PostQuantumBasics from '@/pages/wiki/cryptography/PostQuantumBasics';
import KyberAlgorithm from '@/pages/wiki/cryptography/KyberAlgorithm';
import DilithiumAlgorithm from '@/pages/wiki/cryptography/DilithiumAlgorithm';
import ZeroKnowledgeProofs from '@/pages/wiki/cryptography/ZeroKnowledgeProofs';
import HomomorphicEncryption from '@/pages/wiki/cryptography/HomomorphicEncryption';

// Import security subpages
import ThreatModels from '@/pages/wiki/security/ThreatModels';
import SecurityArchitecture from '@/pages/wiki/security/SecurityArchitecture';
import HardwareSecurity from '@/pages/wiki/security/HardwareSecurity';
import TPMIntegration from '@/pages/wiki/security/TPMIntegration';
import OfflineResilience from '@/pages/wiki/security/OfflineResilience';

// Import identity subpages
import DecentralizedIdentity from '@/pages/wiki/identity/DecentralizedIdentity';
import BiometricAuth from '@/pages/wiki/identity/BiometricAuth';
import KeyManagement from '@/pages/wiki/identity/KeyManagement';
import IdentityVerification from '@/pages/wiki/identity/IdentityVerification';
import StarkNetID from '@/pages/wiki/identity/StarkNetID';

// Import enterprise subpages
import EnterpriseDeployment from '@/pages/wiki/enterprise/EnterpriseDeployment';
import CloudInfrastructure from '@/pages/wiki/enterprise/CloudInfrastructure';
import ComplianceFrameworks from '@/pages/wiki/enterprise/ComplianceFrameworks';
import EnterpriseGovernance from '@/pages/wiki/enterprise/EnterpriseGovernance';
import SecureSupplyChain from '@/pages/wiki/enterprise/SecureSupplyChain';

// Import AI subpages
import AISecurityModels from '@/pages/wiki/ai/AISecurityModels';
import FederatedLearning from '@/pages/wiki/ai/FederatedLearning';
import AnomalyDetection from '@/pages/wiki/ai/AnomalyDetection';
import AIGovernance from '@/pages/wiki/ai/AIGovernance';
import AIEthics from '@/pages/wiki/ai/AIEthics';

// Import military subpages
import MilitarySecurity from '@/pages/wiki/military/MilitarySecurity';
import TacticalComms from '@/pages/wiki/military/TacticalComms';
import BattlefieldEncryption from '@/pages/wiki/military/BattlefieldEncryption';
import ZeroTrustArchitecture from '@/pages/wiki/military/ZeroTrustArchitecture';
import CyberWarfare from '@/pages/wiki/military/CyberWarfare';

// Import development subpages
import APIReference from '@/pages/wiki/development/APIReference';
import SDKDocumentation from '@/pages/wiki/development/SDKDocumentation';
import IntegrationGuides from '@/pages/wiki/development/IntegrationGuides';
import CodeExamples from '@/pages/wiki/development/CodeExamples';
import BestPractices from '@/pages/wiki/development/BestPractices';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enterprise" element={<Enterprise />} />
        
        {/* Wiki structure */}
        <Route path="/wiki" element={<WikiLayout />}>
          <Route index element={<WikiHome />} />
          
          {/* Cryptography Category */}
          <Route path="cryptography" element={<CryptographyCategory />} />
          <Route path="cryptography/post-quantum-basics" element={<PostQuantumBasics />} />
          <Route path="cryptography/kyber-algorithm" element={<KyberAlgorithm />} />
          <Route path="cryptography/dilithium-algorithm" element={<DilithiumAlgorithm />} />
          <Route path="cryptography/zero-knowledge-proofs" element={<ZeroKnowledgeProofs />} />
          <Route path="cryptography/homomorphic-encryption" element={<HomomorphicEncryption />} />
          
          {/* Security Category */}
          <Route path="security" element={<SecurityCategory />} />
          <Route path="security/threat-models" element={<ThreatModels />} />
          <Route path="security/architecture" element={<SecurityArchitecture />} />
          <Route path="security/hardware-security" element={<HardwareSecurity />} />
          <Route path="security/tpm-integration" element={<TPMIntegration />} />
          <Route path="security/offline-resilience" element={<OfflineResilience />} />
          
          {/* Identity Category */}
          <Route path="identity" element={<IdentityCategory />} />
          <Route path="identity/decentralized-identity" element={<DecentralizedIdentity />} />
          <Route path="identity/biometric-authentication" element={<BiometricAuth />} />
          <Route path="identity/key-management" element={<KeyManagement />} />
          <Route path="identity/verification" element={<IdentityVerification />} />
          <Route path="identity/starknet-id" element={<StarkNetID />} />
          
          {/* Enterprise Category */}
          <Route path="enterprise" element={<EnterpriseCategory />} />
          <Route path="enterprise/deployment" element={<EnterpriseDeployment />} />
          <Route path="enterprise/cloud-infrastructure" element={<CloudInfrastructure />} />
          <Route path="enterprise/compliance" element={<ComplianceFrameworks />} />
          <Route path="enterprise/governance" element={<EnterpriseGovernance />} />
          <Route path="enterprise/supply-chain" element={<SecureSupplyChain />} />
          
          {/* AI Category */}
          <Route path="ai" element={<AICategory />} />
          <Route path="ai/security-models" element={<AISecurityModels />} />
          <Route path="ai/federated-learning" element={<FederatedLearning />} />
          <Route path="ai/anomaly-detection" element={<AnomalyDetection />} />
          <Route path="ai/governance" element={<AIGovernance />} />
          <Route path="ai/ethics" element={<AIEthics />} />
          
          {/* Military Category */}
          <Route path="military" element={<MilitaryCategory />} />
          <Route path="military/security" element={<MilitarySecurity />} />
          <Route path="military/tactical-communications" element={<TacticalComms />} />
          <Route path="military/battlefield-encryption" element={<BattlefieldEncryption />} />
          <Route path="military/zero-trust" element={<ZeroTrustArchitecture />} />
          <Route path="military/cyber-warfare" element={<CyberWarfare />} />
          
          {/* Development Category */}
          <Route path="development" element={<DevCategory />} />
          <Route path="development/api-reference" element={<APIReference />} />
          <Route path="development/sdk-documentation" element={<SDKDocumentation />} />
          <Route path="development/integration-guides" element={<IntegrationGuides />} />
          <Route path="development/code-examples" element={<CodeExamples />} />
          <Route path="development/best-practices" element={<BestPractices />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

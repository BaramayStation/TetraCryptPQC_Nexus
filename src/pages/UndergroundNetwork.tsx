
import React from 'react';
import { SecureHead } from '@/utils/secure-head';
import UndergroundNetworkDashboard from '@/components/military/UndergroundNetworkDashboard';

const UndergroundNetworkPage: React.FC = () => {
  return (
    <>
      <SecureHead
        title="TetraCryptPQC - Underground Military Network"
        description="Quantum Secure Underground Communication for Military Applications"
        keywords="Post-Quantum, Secure Messaging, Military, Cryptography, Underground Network"
        ogTitle="TetraCryptPQC Network"
        ogDescription="Beyond Military & Government Standards"
      />
      <UndergroundNetworkDashboard />
    </>
  );
};

export default UndergroundNetworkPage;

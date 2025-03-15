
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">About TetraCryptPQC</h1>
      <p className="mb-4">
        TetraCryptPQC is a comprehensive post-quantum cryptography framework designed for 
        secure, future-proof messaging and identity verification. It implements 
        NIST FIPS 205/206 compliant cryptographic algorithms to protect against 
        both classical and quantum computing threats.
      </p>
    </div>
  );
};

export default About;

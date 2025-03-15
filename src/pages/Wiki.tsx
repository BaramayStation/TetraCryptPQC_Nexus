
import React from 'react';
import { Link } from 'react-router-dom';

const Wiki: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">TetraCryptPQC Wiki</h1>
      <p className="mb-4">
        Explore our knowledge base on post-quantum cryptography and secure communications.
      </p>
      <Link to="/wiki/roadmap/tetracrypt2025vision" className="text-primary hover:underline">
        View 2025 Vision Roadmap
      </Link>
    </div>
  );
};

export default Wiki;

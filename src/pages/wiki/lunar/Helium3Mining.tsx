
import React from 'react';
import WikiLayout from '@/components/layout/WikiLayout';
import WikiPageTemplate from '@/pages/wiki/WikiPageTemplate';
import { Atom, Clock } from 'lucide-react';

const Helium3Mining: React.FC = () => {
  return (
    <WikiLayout>
      <WikiPageTemplate
        title="Lunar Helium-3 Mining"
        description="Post-quantum cryptographic infrastructure for lunar Helium-3 extraction, trade, and energy production secured by TetraCryptPQC."
        icon={<Atom className="h-6 w-6 text-primary" />}
        lastUpdated="May 15, 2024"
        badges={["PQC", "Space Economy", "Energy"]}
      />
    </WikiLayout>
  );
};

export default Helium3Mining;

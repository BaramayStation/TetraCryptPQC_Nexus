
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, ChevronRight, AlertTriangle, Laptop, Fingerprint, Lock } from 'lucide-react';

const SecurityCategory: React.FC = () => {
  const pages = [
    {
      title: 'Threat Models',
      path: '/wiki/security/threat-models',
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      description: 'Comprehensive analysis of classical and quantum threats to cybersecurity',
      tags: ['Quantum Threats', 'Risk Analysis', 'Mitigation']
    },
    {
      title: 'Security Architecture',
      path: '/wiki/security/architecture',
      icon: <Shield className="h-6 w-6 text-primary" />,
      description: 'The layered security approach of TetraCryptPQC',
      tags: ['Zero Trust', 'Defense in Depth', 'NIST']
    },
    {
      title: 'Hardware Security',
      path: '/wiki/security/hardware-security',
      icon: <Laptop className="h-6 w-6 text-primary" />,
      description: 'Hardware-backed security features and integration',
      tags: ['HSM', 'TEE', 'Secure Enclave']
    },
    {
      title: 'TPM Integration',
      path: '/wiki/security/tpm-integration',
      icon: <Fingerprint className="h-6 w-6 text-primary" />,
      description: 'Using Trusted Platform Modules for enhanced security',
      tags: ['TPM 2.0', 'Attestation', 'Key Storage']
    },
    {
      title: 'Offline Resilience',
      path: '/wiki/security/offline-resilience',
      icon: <Lock className="h-6 w-6 text-primary" />,
      description: 'Operating securely in disconnected environments',
      tags: ['Air-Gap', 'Disaster Recovery', 'Failsafe']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          Security
        </h1>
        <p className="mt-2 text-muted-foreground">
          Security architecture, threat models, and defense strategies
        </p>
      </div>
      
      <div className="grid gap-6">
        {pages.map((page) => (
          <Card key={page.path} className="overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-start gap-4">
              <div className="mt-1 p-2 rounded-md bg-primary/10 flex-shrink-0">
                {page.icon}
              </div>
              <div className="space-y-1">
                <CardTitle>
                  <Link to={page.path} className="hover:text-primary transition-colors flex items-center gap-1">
                    {page.title}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardTitle>
                <p className="text-muted-foreground">{page.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {page.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SecurityCategory;

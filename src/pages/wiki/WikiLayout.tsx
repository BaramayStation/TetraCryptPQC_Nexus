
import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/layout/MainLayout';
import { 
  Shield, 
  Lock, 
  Key, 
  Server, 
  Cpu, 
  FileText,
  Home,
  ChevronRight
} from 'lucide-react';

const WikiLayout: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  const categories = [
    { 
      name: 'Cryptography', 
      path: '/wiki/cryptography', 
      icon: <Lock className="h-5 w-5" />,
      pages: [
        { name: 'Post-Quantum Basics', path: '/wiki/cryptography/post-quantum-basics' },
        { name: 'Kyber Algorithm', path: '/wiki/cryptography/kyber-algorithm' },
        { name: 'Dilithium Algorithm', path: '/wiki/cryptography/dilithium-algorithm' },
        { name: 'Zero-Knowledge Proofs', path: '/wiki/cryptography/zero-knowledge-proofs' },
        { name: 'Homomorphic Encryption', path: '/wiki/cryptography/homomorphic-encryption' }
      ]
    },
    { 
      name: 'Security', 
      path: '/wiki/security', 
      icon: <Shield className="h-5 w-5" />,
      pages: [
        { name: 'Threat Models', path: '/wiki/security/threat-models' },
        { name: 'Security Architecture', path: '/wiki/security/architecture' },
        { name: 'Hardware Security', path: '/wiki/security/hardware-security' },
        { name: 'TPM Integration', path: '/wiki/security/tpm-integration' },
        { name: 'Offline Resilience', path: '/wiki/security/offline-resilience' }
      ]
    },
    { 
      name: 'Identity', 
      path: '/wiki/identity', 
      icon: <Key className="h-5 w-5" />,
      pages: [
        { name: 'Decentralized Identity', path: '/wiki/identity/decentralized-identity' },
        { name: 'Biometric Authentication', path: '/wiki/identity/biometric-authentication' },
        { name: 'Key Management', path: '/wiki/identity/key-management' },
        { name: 'Identity Verification', path: '/wiki/identity/verification' },
        { name: 'StarkNet ID', path: '/wiki/identity/starknet-id' }
      ]
    },
    { 
      name: 'Enterprise', 
      path: '/wiki/enterprise', 
      icon: <Server className="h-5 w-5" />,
      pages: [
        { name: 'Enterprise Deployment', path: '/wiki/enterprise/deployment' },
        { name: 'Cloud Infrastructure', path: '/wiki/enterprise/cloud-infrastructure' },
        { name: 'Compliance Frameworks', path: '/wiki/enterprise/compliance' },
        { name: 'Enterprise Governance', path: '/wiki/enterprise/governance' },
        { name: 'Secure Supply Chain', path: '/wiki/enterprise/supply-chain' }
      ]
    },
    { 
      name: 'AI', 
      path: '/wiki/ai', 
      icon: <Cpu className="h-5 w-5" />,
      pages: [
        { name: 'AI Security Models', path: '/wiki/ai/security-models' },
        { name: 'Federated Learning', path: '/wiki/ai/federated-learning' },
        { name: 'Anomaly Detection', path: '/wiki/ai/anomaly-detection' },
        { name: 'AI Governance', path: '/wiki/ai/governance' },
        { name: 'AI Ethics', path: '/wiki/ai/ethics' }
      ]
    },
    { 
      name: 'Military', 
      path: '/wiki/military', 
      icon: <Shield className="h-5 w-5" />,
      pages: [
        { name: 'Military Security', path: '/wiki/military/security' },
        { name: 'Tactical Communications', path: '/wiki/military/tactical-communications' },
        { name: 'Battlefield Encryption', path: '/wiki/military/battlefield-encryption' },
        { name: 'Zero-Trust Architecture', path: '/wiki/military/zero-trust' },
        { name: 'Cyber Warfare', path: '/wiki/military/cyber-warfare' }
      ]
    },
    { 
      name: 'Development', 
      path: '/wiki/development', 
      icon: <FileText className="h-5 w-5" />,
      pages: [
        { name: 'API Reference', path: '/wiki/development/api-reference' },
        { name: 'SDK Documentation', path: '/wiki/development/sdk-documentation' },
        { name: 'Integration Guides', path: '/wiki/development/integration-guides' },
        { name: 'Code Examples', path: '/wiki/development/code-examples' },
        { name: 'Best Practices', path: '/wiki/development/best-practices' }
      ]
    }
  ];
  
  const isActivePage = (path: string) => location.pathname === path;
  const isActiveCategory = (categoryPath: string) => {
    return location.pathname.startsWith(categoryPath) && categoryPath !== '/wiki';
  };
  
  return (
    <MainLayout fullWidth>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card hidden lg:block">
          <ScrollArea className="h-screen py-6 px-4">
            <div className="mb-6">
              <Link 
                to="/wiki" 
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Shield className="h-5 w-5 text-primary" />
                <span>TetraCryptPQC Wiki</span>
              </Link>
            </div>
            
            <nav className="space-y-1">
              {categories.map((category) => (
                <div key={category.path} className="space-y-1">
                  <Link
                    to={category.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                      isActiveCategory(category.path)
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </Link>
                  
                  {isActiveCategory(category.path) && (
                    <div className="ml-6 mt-1 space-y-1 border-l pl-2">
                      {category.pages.map((page) => (
                        <Link
                          key={page.path}
                          to={page.path}
                          className={`flex items-center text-xs px-2 py-1.5 rounded-md ${
                            isActivePage(page.path)
                              ? "bg-secondary/70 text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                          }`}
                        >
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </aside>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* Breadcrumbs */}
          <div className="bg-background border-b px-4 py-2">
            <div className="flex items-center text-sm">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
                <Home className="h-4 w-4 mr-1" />
                <span>Home</span>
              </Link>
              <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
              
              <Link to="/wiki" className={`text-muted-foreground hover:text-foreground ${
                pathSegments.length === 1 && pathSegments[0] === 'wiki' ? 'font-medium text-foreground' : ''
              }`}>
                Wiki
              </Link>
              
              {pathSegments.slice(1).map((segment, index) => {
                const path = `/${pathSegments.slice(0, index + 2).join('/')}`;
                const isLast = index === pathSegments.slice(1).length - 1;
                
                // Format the segment for display (replace hyphens with spaces, capitalize)
                const formattedSegment = segment
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
                
                return (
                  <React.Fragment key={path}>
                    <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                    <Link
                      to={path}
                      className={`${isLast ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {formattedSegment}
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          
          {/* Page content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WikiLayout;

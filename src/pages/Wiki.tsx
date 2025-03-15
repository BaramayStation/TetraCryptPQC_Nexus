
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Rocket, Atom, Shield, Coins, Network } from 'lucide-react';
import { MainLayout } from '@/layout/MainLayout';

const Wiki: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">TetraCryptPQC Wiki</h1>
        <p className="mb-8">
          Explore our knowledge base on post-quantum cryptography, secure communications, and space economies secured with TetraCryptPQC.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Moon className="h-5 w-5 text-primary mr-2" />
                Lunar Resources
              </CardTitle>
              <CardDescription>Post-quantum secured lunar mining</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explore the TetraCryptPQC infrastructure securing Helium-3 mining operations on the Moon, including extraction, processing, and interplanetary trade.
              </p>
              <Link 
                to="/wiki/lunar/helium3mining" 
                className="text-primary hover:underline text-sm"
              >
                View Lunar Helium-3 Mining →
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Rocket className="h-5 w-5 text-primary mr-2" />
                Asteroid Mining
              </CardTitle>
              <CardDescription>Quantum-resistant resource extraction</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about securing autonomous asteroid mining operations in the Main and Kuiper Belts with post-quantum cryptography and AI-driven systems.
              </p>
              <Link 
                to="/wiki/space/asteroidmining" 
                className="text-primary hover:underline text-sm"
              >
                View Asteroid Mining →
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Coins className="h-5 w-5 text-primary mr-2" />
                Space Economy
              </CardTitle>
              <CardDescription>Interplanetary financial systems</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Discover how TetraCryptPQC secures interplanetary financial transactions, resource-backed currencies, and decentralized economic governance.
              </p>
              <Link 
                to="/wiki/space/spaceeconomy" 
                className="text-primary hover:underline text-sm"
              >
                View Space Economy →
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Shield className="h-5 w-5 text-primary mr-2" />
                Post-Quantum Security
              </CardTitle>
              <CardDescription>Cryptographic foundations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Understand the fundamentals of post-quantum cryptography, including ML-KEM, SLH-DSA, and other quantum-resistant algorithms.
              </p>
              <Link 
                to="/wiki/cryptography/post-quantum-basics" 
                className="text-primary hover:underline text-sm"
              >
                View Post-Quantum Security →
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Atom className="h-5 w-5 text-primary mr-2" />
                Fusion Energy
              </CardTitle>
              <CardDescription>Helium-3 powered future</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about Helium-3 fusion technology, its advantages over conventional energy sources, and the lunar mining operations that make it possible.
              </p>
              <Link 
                to="/lunar/helium3-economy" 
                className="text-primary hover:underline text-sm"
              >
                View Helium-3 Economy →
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Network className="h-5 w-5 text-primary mr-2" />
                Decentralized Governance
              </CardTitle>
              <CardDescription>Quantum-resistant DAOs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explore how post-quantum cryptography enables secure decentralized governance of space resources, preventing monopolization and ensuring fair access.
              </p>
              <Link 
                to="/wiki/identity/decentralized-identity" 
                className="text-primary hover:underline text-sm"
              >
                View Decentralized Identity →
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">TetraCryptPQC Roadmap</h2>
          <p className="mb-4">
            Explore our vision for the future of TetraCryptPQC and its role in securing interplanetary resources and trade.
          </p>
          <Link to="/wiki/roadmap/tetracrypt2025vision" className="text-primary hover:underline">
            View 2025 Vision Roadmap →
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Wiki;

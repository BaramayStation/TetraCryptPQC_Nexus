
import React from 'react';
import WikiLayout from '@/components/layout/WikiLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Rocket, Clock, Coins, Globe, Moon, Shield, Network, Server } from 'lucide-react';

const SpaceEconomy: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="h-6 w-6 text-primary" />
            {['PQC', 'Economics', 'Infrastructure'].map((badge) => (
              <Badge key={badge} variant="outline" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold">Space-Based Economy</h1>
          <p className="mt-2 text-muted-foreground">
            Post-quantum secured financial infrastructure for interplanetary trade, resource allocation, and decentralized governance using TetraCryptPQC.
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: May 18, 2024</span>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="currency">Digital Currency</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Space Economy Overview</h2>
                <p className="mb-4">
                  The space-based economy represents a multi-trillion dollar ecosystem built around extraterrestrial resource extraction, interplanetary trade, and off-world manufacturing. As humanity expands into the solar system, the need for secure, quantum-resistant economic infrastructure becomes critical. TetraCryptPQC provides the cryptographic foundation for this economy, ensuring that all financial transactions and resource allocations remain secure against both current and future threats.
                </p>
                <p className="mb-4">
                  Key components of the space economy include lunar mining operations, asteroid resource extraction, Martian colonization, and Earth-orbit manufacturing. All these activities are unified through a decentralized financial system secured by post-quantum cryptography, with AI-driven logistics optimization and automated smart contracts managing complex supply chains spanning millions of kilometers.
                </p>
                <div className="bg-muted p-4 rounded-md mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Economic Sectors</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Resource extraction (Helium-3, water, platinum-group metals)</li>
                    <li>Interplanetary logistics and transportation</li>
                    <li>Space-based manufacturing and construction</li>
                    <li>Energy production and distribution</li>
                    <li>Habitat development and life support systems</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="currency" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">TetraLunar: Post-Quantum Digital Currency</h2>
                <p className="mb-4">
                  TetraLunar (₮) serves as the primary digital currency for interplanetary commerce, backed by physical reserves of Helium-3 and platinum-group metals extracted from lunar and asteroid mining operations. This asset-backed cryptocurrency uses post-quantum cryptographic protocols to ensure transaction integrity, even against quantum computing attacks.
                </p>
                <div className="space-y-4">
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Quantum-Resistant Architecture</h3>
                    </div>
                    <p className="text-sm">
                      TetraLunar implements a multi-layered security approach using ML-KEM for transaction encryption and SLH-DSA for digital signatures. The distributed ledger uses hash-based post-quantum resistant consensus mechanisms to prevent both traditional and quantum-based double-spending attacks.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Network className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Interplanetary Payment Network</h3>
                    </div>
                    <p className="text-sm">
                      The TetraLunar payment network operates across multiple planetary bodies using a delay-tolerant networking protocol. Light-speed latency between Earth and Mars (3-22 minutes) is addressed through AI-driven predictive transaction validation, allowing commerce to continue despite communication delays.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Resource-Backed Value Stability</h3>
                    </div>
                    <p className="text-sm">
                      Unlike traditional cryptocurrencies, TetraLunar maintains value stability through direct backing by physical space resources. Each TetraLunar token represents ownership of a specific quantity of Helium-3 or other valuable space resources held in secure orbital vaults, verified through quantum-resistant proof-of-reserves protocols.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="infrastructure" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Space Economic Infrastructure</h2>
                <p className="mb-4">
                  The space economy relies on several critical infrastructure systems, all secured by TetraCryptPQC protocols:
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Interplanetary Supply Chain</h3>
                    <p className="text-sm mb-2">
                      The backbone of the space economy is a complex network of autonomous cargo vessels, refueling stations, and transfer hubs that move resources between planets, moons, and asteroid mining operations. TetraCryptPQC secures all aspects of this supply chain from route planning to cargo verification.
                    </p>
                    <div className="bg-muted p-3 rounded-md flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-4 text-center text-xs w-full max-w-md py-3">
                        <div>
                          <Moon className="h-8 w-8 mx-auto mb-1 text-primary" />
                          <div>Lunar Extraction</div>
                        </div>
                        <div>
                          <Rocket className="h-8 w-8 mx-auto mb-1 text-primary" />
                          <div>PQC-Secured Transport</div>
                        </div>
                        <div>
                          <Globe className="h-8 w-8 mx-auto mb-1 text-primary" />
                          <div>Earth Delivery</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Decentralized Market System</h3>
                    <p className="text-sm mb-2">
                      Resource trading occurs through quantum-resistant decentralized exchanges that match buyers and sellers across the solar system. Smart contracts automatically execute complex multi-party trades while maintaining cryptographic integrity through post-quantum signatures.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Orbital Data Centers</h3>
                    <p className="text-sm mb-2">
                      A distributed network of space-based data centers maintains the economic ledger and smart contract execution environment. These hardened facilities use multiple post-quantum cryptographic protocols to secure financial data, with cross-verification between Earth, lunar, and Martian installations providing resilience against regional disruptions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="governance" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Decentralized Space Economy Governance</h2>
                <p className="mb-4">
                  The interplanetary economy operates through a decentralized governance structure that prevents domination by any single entity, corporation, or planetary government:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Quantum-Resistant Voting</h3>
                    <p className="text-sm mb-3">
                      Economic policies are determined through secure post-quantum voting mechanisms. SLH-DSA signatures verify voter identity while zero-knowledge proofs ensure voting rights without revealing personal information. This system allows democratic participation in economic governance regardless of physical location in the solar system.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Resource Allocation DAOs</h3>
                    <p className="text-sm mb-3">
                      Decentralized Autonomous Organizations manage resource extraction rights and allocation through quantum-resistant smart contracts. Mining permits, extraction quotas, and resource distribution are governed by transparent algorithms with cryptographic verification of compliance.
                    </p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Interplanetary Dispute Resolution</h3>
                    <p className="text-sm">
                      Economic disputes between parties on different planets are resolved through a multi-stage system using secure multi-party computation (MPC) and quantum-resistant cryptographic evidence validation. This allows fair arbitration despite physical separation of the involved parties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Related Topics</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <a href="/wiki/lunar/helium3mining" className="text-primary hover:underline flex items-center">
              <Moon className="h-4 w-4 mr-1" />
              Lunar Helium-3 Mining
            </a>
            <a href="/wiki/space/asteroidmining" className="text-primary hover:underline flex items-center">
              <Rocket className="h-4 w-4 mr-1" />
              Asteroid Mining
            </a>
            <a href="/wiki/identity/decentralized-identity" className="text-primary hover:underline flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Decentralized Identity
            </a>
          </div>
        </div>
      </div>
    </WikiLayout>
  );
};

export default SpaceEconomy;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Scale, Shield, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

const AIEthics: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">AI</Badge>
            <Badge variant="outline" className="text-xs">PQ-SCIF</Badge>
          </div>
          <h1 className="text-3xl font-bold">AI Ethics in Post-Quantum Security</h1>
          <p className="mt-2 text-muted-foreground">
            Ethical considerations for quantum-resistant AI security systems
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">PQ-SCIF Ethics Overview</h2>
            <p className="mb-4">
              TetraCryptPQC embeds ethical principles in its AI security systems,
              ensuring transparency, fairness, and accountability while maintaining
              strong post-quantum cryptographic protections for sensitive operations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="border p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Military-Grade Security</h3>
                </div>
                <p className="text-sm">
                  Our PQ-SCIF framework implements CNSA 2.0 and NIST PQC standards, providing 
                  quantum-resistant protection while adhering to ethical use of AI for autonomous 
                  threat detection.
                </p>
              </div>
              
              <div className="border p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Ethical Considerations</h3>
                </div>
                <p className="text-sm">
                  With great security comes great responsibility. Our AI-driven anomaly detection 
                  is designed with fairness principles to prevent bias in threat identification.
                </p>
              </div>
              
              <div className="border p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Transparency</h3>
                </div>
                <p className="text-sm">
                  All AI-driven security decisions in PQ-SCIF environments include 
                  auditability mechanisms and explainable AI features to maintain 
                  accountability despite high encryption.
                </p>
              </div>
              
              <div className="border p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Privacy Protection</h3>
                </div>
                <p className="text-sm">
                  Zero-knowledge proofs and homomorphic encryption techniques ensure 
                  AI models can provide security without compromising user privacy or 
                  revealing sensitive data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Ethical AI in Classified Environments</h2>
            <p className="mb-4">
              For SCIF and classified military operations, ethical AI implementation requires additional
              considerations to balance security with transparency and accountability.
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Separation of AI model training from operational applications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Adversarial AI testing to prevent malicious exploitation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Regular security audits with independent verification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Quantum-resistant encryption for all AI model parameters</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Ethical guidelines for AI-governed command decisions</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default AIEthics;

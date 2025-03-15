
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { runAllTests, testPQCKeyGeneration, testEncryptionDecryption, 
         testDigitalSignatures, testP2PCommunication } from '@/utils/launch-readiness-test';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface TestSuite {
  name: string;
  results: TestResult[];
  startTime: Date;
  endTime?: Date;
  success: boolean;
}

interface TestResult {
  name: string;
  success: boolean;
  message: string;
  data?: any;
  error?: Error;
}

const LaunchReadinessPanel: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{ success: boolean; suites: TestSuite[] } | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('overview');

  const handleRunAllTests = async () => {
    setIsRunning(true);
    setResults(null);
    
    try {
      const testResults = await runAllTests();
      setResults(testResults);
    } catch (error) {
      console.error("Test runner error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunSingleTest = async (testFunction: () => Promise<TestSuite>) => {
    setIsRunning(true);
    
    try {
      const suite = await testFunction();
      
      // Update or add the suite to results
      if (results) {
        const updatedSuites = [...results.suites.filter(s => s.name !== suite.name), suite];
        const allSuccess = updatedSuites.every(s => s.success);
        setResults({
          success: allSuccess,
          suites: updatedSuites
        });
      } else {
        setResults({
          success: suite.success,
          suites: [suite]
        });
      }
    } catch (error) {
      console.error("Test runner error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          TetraCryptPQC Launch Readiness Test
        </CardTitle>
        <CardDescription>
          Verify that all cryptographic and P2P functions are working correctly before launch
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            onClick={handleRunAllTests} 
            disabled={isRunning}
            className="gap-2"
          >
            {isRunning ? <RefreshCw className="h-4 w-4 animate-spin" /> : null}
            Run All Tests
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleRunSingleTest(testPQCKeyGeneration)}
            disabled={isRunning}
          >
            Test Key Generation
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleRunSingleTest(testEncryptionDecryption)}
            disabled={isRunning}
          >
            Test Encryption/Decryption
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleRunSingleTest(testDigitalSignatures)}
            disabled={isRunning}
          >
            Test Signatures
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleRunSingleTest(testP2PCommunication)}
            disabled={isRunning}
          >
            Test P2P
          </Button>
        </div>
        
        {isRunning && (
          <Alert>
            <RefreshCw className="h-4 w-4 animate-spin" />
            <AlertTitle>Running tests...</AlertTitle>
            <AlertDescription>
              This may take a few moments. Please wait while we verify all system components.
            </AlertDescription>
          </Alert>
        )}
        
        {results && (
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {results.suites.map((suite) => (
                <TabsTrigger key={suite.name} value={suite.name}>
                  {suite.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Overall Status:</h3>
                  {results.success ? (
                    <Badge className="bg-green-500">PASSED</Badge>
                  ) : (
                    <Badge variant="destructive">FAILED</Badge>
                  )}
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Test Suites:</h3>
                  <div className="space-y-2">
                    {results.suites.map((suite) => (
                      <div 
                        key={suite.name}
                        className="p-3 rounded-md border flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          {suite.success ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span>{suite.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {suite.results.filter(r => r.success).length}/{suite.results.length} tests passed
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedTab(suite.name)}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {results.suites.map((suite) => (
              <TabsContent key={suite.name} value={suite.name}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{suite.name}</h3>
                      {suite.success ? (
                        <Badge className="bg-green-500">PASSED</Badge>
                      ) : (
                        <Badge variant="destructive">FAILED</Badge>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        switch(suite.name) {
                          case "PQC Key Generation":
                            return handleRunSingleTest(testPQCKeyGeneration);
                          case "Encryption and Decryption":
                            return handleRunSingleTest(testEncryptionDecryption);
                          case "Digital Signatures":
                            return handleRunSingleTest(testDigitalSignatures);
                          case "P2P Communication":
                            return handleRunSingleTest(testP2PCommunication);
                        }
                      }}
                      disabled={isRunning}
                      className="gap-1"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Run Again
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {suite.results.map((result) => (
                      <div 
                        key={result.name}
                        className={`p-3 rounded-md ${
                          result.success 
                            ? "bg-green-500/10 border-green-500/30" 
                            : "bg-red-500/10 border-red-500/30"
                        } border`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {result.success ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="font-medium">{result.name}</span>
                        </div>
                        
                        {!result.success && result.error && (
                          <div className="mt-2 p-2 bg-background/50 rounded border border-border/60 text-sm font-mono">
                            {result.error.message}
                          </div>
                        )}
                        
                        {result.success && result.data && (
                          <details className="mt-2">
                            <summary className="text-xs text-muted-foreground cursor-pointer">
                              View details
                            </summary>
                            <div className="mt-2 p-2 bg-background/50 rounded border border-border/60 text-xs font-mono overflow-auto max-h-[200px]">
                              <pre>{JSON.stringify(result.data, null, 2)}</pre>
                            </div>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col items-start">
        <div className="text-sm text-muted-foreground">
          <p className="flex items-center gap-1 mb-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>These tests verify core functionalities but don't replace comprehensive QA.</span>
          </p>
          <p>For production deployment, consider additional security audits and load testing.</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LaunchReadinessPanel;

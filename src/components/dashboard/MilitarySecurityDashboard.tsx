import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Bell, Activity, Lock, Globe } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Threat } from "@/lib/storage-types"; // Import the Threat type

const MilitarySecurityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('threats');
  const [threats, setThreats] = useState<Threat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate fetching threats from an API or database
        const simulatedThreats: Threat[] = [
          {
            id: "1",
            timestamp: new Date().toISOString(),
            severity: "high",
            source: "AI Threat Detection",
            target: "Network Infrastructure",
            type: "DDoS Attack",
            description: "Large-scale DDoS attack detected on critical network infrastructure.",
            status: "active",
            mitigationSteps: ["Initiate DDoS mitigation protocols", "Isolate affected servers"]
          },
          {
            id: "2",
            timestamp: new Date().toISOString(),
            severity: "medium",
            source: "Intrusion Detection System",
            target: "Database Server",
            type: "SQL Injection Attempt",
            description: "Attempted SQL injection detected on database server.",
            status: "mitigated",
            mitigationSteps: ["Review database logs", "Update security patches"]
          },
          {
            id: "3",
            timestamp: new Date().toISOString(),
            severity: "low",
            source: "Security Audit",
            target: "User Accounts",
            type: "Weak Password Detected",
            description: "A user account with a weak password has been detected.",
            status: "resolved",
            mitigationSteps: ["Force password reset", "Implement password complexity requirements"]
          }
        ];
        setThreats(simulatedThreats);
      } catch (error) {
        console.error("Error loading threats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Military Security Dashboard
          </h2>
          <p className="text-muted-foreground">
            Real-time threat monitoring and incident response
          </p>
        </div>
        <Button variant="outline">
          <Bell className="h-4 w-4 mr-2" />
          View Notifications
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="threats">Active Threats</TabsTrigger>
          <TabsTrigger value="analytics">Security Analytics</TabsTrigger>
          <TabsTrigger value="response">Incident Response</TabsTrigger>
        </TabsList>
        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Threats</CardTitle>
              <CardDescription>Real-time threat monitoring and incident details</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading threats...</div>
              ) : threats.length === 0 ? (
                <div className="text-center py-4">No active threats detected.</div>
              ) : (
                <ScrollArea className="h-[400px] w-full">
                  <div className="divide-y divide-border">
                    {threats.map((threat) => (
                      <div key={threat.id} className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h3 className="text-sm font-medium">{threat.type}</h3>
                            <p className="text-xs text-muted-foreground">{threat.description}</p>
                          </div>
                          <Badge variant={threat.severity === "high" ? "destructive" : threat.severity === "medium" ? "secondary" : "outline"}>
                            {threat.severity}
                          </Badge>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Source: {threat.source} • Target: {threat.target} • Timestamp: {new Date(threat.timestamp).toLocaleString()}
                        </div>
                        {threat.mitigationSteps && threat.mitigationSteps.length > 0 && (
                          <div className="mt-3">
                            <h4 className="text-xs font-medium">Mitigation Steps:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {threat.mitigationSteps.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Analytics</CardTitle>
              <CardDescription>Visualize security trends and key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="text-sm">Threat Detection Rate</CardTitle>
                    <CardDescription className="text-xs">Percentage of threats detected</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">98.5%</div>
                    <Progress value={98.5} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="text-sm">Incident Response Time</CardTitle>
                    <CardDescription className="text-xs">Average time to respond to incidents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.2 min</div>
                    <Progress value={60} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="text-sm">System Uptime</CardTitle>
                    <CardDescription className="text-xs">Overall system availability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">99.99%</div>
                    <Progress value={99.99} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="text-sm">Security Compliance</CardTitle>
                    <CardDescription className="text-xs">Compliance with security standards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">100%</div>
                    <Progress value={100} className="h-2 mt-2" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="response" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incident Response</CardTitle>
              <CardDescription>Automated incident response and manual actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Automated Incident Response</h3>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automated incident response is enabled for common threats.
                </p>

                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Manual Incident Actions</h3>
                  <Button variant="outline" size="sm">
                    Take Action
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Take manual actions to respond to specific incidents.
                </p>

                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Response Playbooks</h3>
                  <Button variant="outline" size="sm">
                    View Playbooks
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  View and manage incident response playbooks.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MilitarySecurityDashboard;

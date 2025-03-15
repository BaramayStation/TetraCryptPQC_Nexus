
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  BarChart, 
  LineChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Network, 
  Server, 
  Globe,
  Clock,
  Cpu
} from 'lucide-react';

const performanceData = [
  { name: 'Jan', transactions: 4000, nodes: 400, aiDecisions: 2400 },
  { name: 'Feb', transactions: 4500, nodes: 420, aiDecisions: 2700 },
  { name: 'Mar', transactions: 5100, nodes: 480, aiDecisions: 3000 },
  { name: 'Apr', transactions: 4800, nodes: 460, aiDecisions: 2800 },
  { name: 'May', transactions: 5300, nodes: 490, aiDecisions: 3300 },
  { name: 'Jun', transactions: 5800, nodes: 520, aiDecisions: 3600 },
  { name: 'Jul', transactions: 6000, nodes: 550, aiDecisions: 4000 },
];

const consensusData = [
  { name: 'Week 1', aiConsensus: 98, zkValidation: 95, failsafeChecks: 99 },
  { name: 'Week 2', aiConsensus: 97, zkValidation: 96, failsafeChecks: 99 },
  { name: 'Week 3', aiConsensus: 99, zkValidation: 98, failsafeChecks: 100 },
  { name: 'Week 4', aiConsensus: 98, zkValidation: 97, failsafeChecks: 99 },
];

const NexusBlockchainStats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Clock className="mr-2 h-4 w-4 text-primary" />
              Block Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0.5s</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average block confirmation time
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Network className="mr-2 h-4 w-4 text-primary" />
              Network Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">99.999%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Uptime with quantum-resistant failover
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Globe className="mr-2 h-4 w-4 text-primary" />
              Active Nodes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground mt-1">
              Globally distributed quantum-secure nodes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-primary" />
            Network Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#8884d8" 
                  name="Transactions (thousands)"
                />
                <Line 
                  type="monotone" 
                  dataKey="nodes" 
                  stroke="#82ca9d" 
                  name="Active Nodes"
                />
                <Line 
                  type="monotone" 
                  dataKey="aiDecisions" 
                  stroke="#ff7300" 
                  name="AI Decisions (thousands)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Cpu className="mr-2 h-5 w-5 text-primary" />
              AI Consensus Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={consensusData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[90, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="aiConsensus" 
                    name="AI Consensus %" 
                    fill="#8884d8" 
                  />
                  <Bar 
                    dataKey="zkValidation" 
                    name="zk-STARK Validation %" 
                    fill="#82ca9d" 
                  />
                  <Bar 
                    dataKey="failsafeChecks" 
                    name="Failsafe Verification %" 
                    fill="#ffc658" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Server className="mr-2 h-5 w-5 text-primary" />
              System Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">CPU Usage</p>
                  <span className="text-xs">42%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Memory Usage</p>
                  <span className="text-xs">38%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '38%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Storage Usage</p>
                  <span className="text-xs">67%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: '67%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Network Bandwidth</p>
                  <span className="text-xs">51%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '51%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NexusBlockchainStats;

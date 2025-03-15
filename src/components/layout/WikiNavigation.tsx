
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Book, ShieldAlert, Building2, Rocket,
  Cpu, Brain, Server, Network, Globe, Lock,
  FileText, BookOpen, Calendar
} from 'lucide-react';

const WikiNavigation: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 py-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Roadmap</h3>
        </div>
        <div className="pl-4 space-y-1 mt-1">
          <NavLink 
            to="/wiki/roadmap/tetracrypt2025vision" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            TetraCrypt 2025 Vision
          </NavLink>
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 py-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-medium">AI Security</h3>
        </div>
        <div className="pl-4 space-y-1 mt-1">
          <NavLink 
            to="/wiki/ai/aiethics" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            AI Ethics
          </NavLink>
          <NavLink 
            to="/wiki/ai/aigovernance" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            AI Governance
          </NavLink>
          <NavLink 
            to="/wiki/ai/aisecuritymodels" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            AI Security Models
          </NavLink>
          <NavLink 
            to="/wiki/ai/federatedlearning" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Federated Learning
          </NavLink>
          <NavLink 
            to="/wiki/ai/anomalydetection" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Anomaly Detection
          </NavLink>
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 py-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Enterprise Security</h3>
        </div>
        <div className="pl-4 space-y-1 mt-1">
          <NavLink 
            to="/wiki/enterprise/cloudinfrastructure" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Cloud Infrastructure
          </NavLink>
          <NavLink 
            to="/wiki/enterprise/complianceframeworks" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Compliance Frameworks
          </NavLink>
          <NavLink 
            to="/wiki/enterprise/enterprisegovernance" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Enterprise Governance
          </NavLink>
          <NavLink 
            to="/wiki/enterprise/securesupplychain" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Secure Supply Chain
          </NavLink>
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 py-2">
          <ShieldAlert className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Military Security</h3>
        </div>
        <div className="pl-4 space-y-1 mt-1">
          <NavLink 
            to="/wiki/military/militarysecurity" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Military Security
          </NavLink>
          <NavLink 
            to="/wiki/military/tacticalcomms" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Tactical Comms
          </NavLink>
          <NavLink 
            to="/wiki/military/battlefieldencryption" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Battlefield Encryption
          </NavLink>
          <NavLink 
            to="/wiki/military/zerotrustarchitecture" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Zero Trust Architecture
          </NavLink>
          <NavLink 
            to="/wiki/military/cyberwarfare" 
            className={({ isActive }) => 
              `block py-1.5 px-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`
            }
          >
            Cyber Warfare
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WikiNavigation;

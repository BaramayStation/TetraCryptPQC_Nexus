
import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Users,
  LockKeyhole,
  BrainCircuit,
  ShieldCheck,
  FileCode2,
  ServerCrash,
  Settings,
  Book,
  Building2,
  ShieldAlert,
  Moon,
  Rocket
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Home",
    href: "/home",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Users",
    href: "/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Authentication",
    href: "/authentication",
    icon: <LockKeyhole className="h-4 w-4" />,
  },
  {
    title: "AI Security",
    href: "/ai-security",
    icon: <BrainCircuit className="h-4 w-4" />,
  },
  {
    title: "Post-Quantum Security",
    href: "/post-quantum-security",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    title: "Lunar Helium-3 Economy",
    href: "/lunar/helium3-economy",
    icon: <Moon className="h-4 w-4" />,
  },
  {
    title: "Web3 Security",
    href: "/web3-security",
    icon: <FileCode2 className="h-4 w-4" />,
  },
  {
    title: "Secure Infrastructure",
    href: "/secure-infrastructure",
    icon: <ServerCrash className="h-4 w-4" />,
  },
  {
    title: "Enterprise",
    href: "/enterprise",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    title: "COG Failsafe",
    href: "/failsafe-continuity",
    icon: <ShieldAlert className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    title: "Wiki",
    href: "/wiki",
    icon: <Book className="h-4 w-4" />,
  },
];

interface MainSideBarProps {
  className?: string;
}

const MainSideBar: React.FC<MainSideBarProps> = ({ className }) => {
  return (
    <div className={`w-64 flex-shrink-0 border-r bg-secondary py-4 ${className}`}>
      <div className="space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200"
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { MainSideBar };

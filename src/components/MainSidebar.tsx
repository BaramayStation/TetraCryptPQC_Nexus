
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  FileUp,
  Key,
  Settings,
  MessageSquare,
  Shield,
  Cloud,
  CircuitBoard,
  Network,
  ShieldCheck,
  FileCheck,
  Lock
} from "lucide-react";

type SidebarLink = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const links: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "File Encryption",
    href: "/file-encryption",
    icon: <FileUp className="h-5 w-5" />,
  },
  {
    title: "Key Management",
    href: "/key-management",
    icon: <Key className="h-5 w-5" />,
  },
  {
    title: "Standard Chat",
    href: "/chat",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Secure Messaging",
    href: "/secure-messaging",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Decentralized Cloud",
    href: "/decentralized-cloud",
    icon: <Cloud className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export const MainSidebar = () => {
  const location = useLocation();

  return (
    <div className="py-6 space-y-6 h-full border-r">
      <div className="flex items-center gap-2 px-5 mb-8">
        <Lock className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">TetraCryptPQC</h1>
      </div>

      <div className="space-y-1 px-3">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-md text-muted-foreground transition-colors hover:text-foreground",
              location.pathname === link.href && "bg-accent text-accent-foreground"
            )}
          >
            {link.icon}
            <span>{link.title}</span>
          </Link>
        ))}
      </div>

      <div className="px-4 mt-6">
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 py-1.5 px-2">
            <Shield className="h-5 w-5 text-accent" />
            <span className="text-sm">FIPS 205 & 206 Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

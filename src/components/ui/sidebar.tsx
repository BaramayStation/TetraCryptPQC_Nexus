
import React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, MessageSquare, Settings, ShieldAlert, Menu, Lock, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "@/components/ui/logo";

// Navigation links configuration
const navLinks = [
  {
    to: "/",
    icon: <HomeIcon className="h-5 w-5" />,
    label: "Home",
  },
  {
    to: "/dashboard",
    icon: <ShieldAlert className="h-5 w-5" />,
    label: "Security Dashboard",
  },
  {
    to: "/key-management",
    icon: <Key className="h-5 w-5" />,
    label: "Key Management",
  },
  {
    to: "/secure-communication",
    icon: <Lock className="h-5 w-5" />,
    label: "Secure Communication",
  },
  {
    to: "/chat",
    icon: <MessageSquare className="h-5 w-5" />,
    label: "Secure Chat",
  },
  {
    to: "/settings",
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
  },
];

// Link component with active state styling
const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

// Desktop sidebar
const DesktopSidebar = () => (
  <div className="hidden lg:flex flex-col w-64 border-r bg-card/50 backdrop-blur-sm h-screen sticky top-0">
    <div className="p-6">
      <Logo />
    </div>
    <nav className="flex-1 px-4 space-y-2 py-4">
      {navLinks.map((link) => (
        <NavItem key={link.to} {...link} />
      ))}
    </nav>
    <div className="p-4 border-t text-center text-xs text-muted-foreground">
      TetraCryptPQC v0.1.0
    </div>
  </div>
);

// Mobile sidebar with sheet component
const MobileSidebar = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-64 p-0">
      <div className="p-6">
        <Logo />
      </div>
      <nav className="flex-1 px-4 space-y-2 py-4">
        {navLinks.map((link) => (
          <NavItem key={link.to} {...link} />
        ))}
      </nav>
      <div className="p-4 border-t text-center text-xs text-muted-foreground">
        TetraCryptPQC v0.1.0
      </div>
    </SheetContent>
  </Sheet>
);

// Combined sidebar component
export function Sidebar() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileSidebar /> : <DesktopSidebar />;
}

export default Sidebar;

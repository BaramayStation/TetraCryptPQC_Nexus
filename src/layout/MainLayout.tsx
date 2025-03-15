
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Shield, 
  Settings, 
  MessageSquare, 
  Home, 
  Key, 
  Server, 
  Lock, 
  Building2, 
  FileText,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  fullWidth = false 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Dashboard", path: "/dashboard", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Messaging", path: "/chat", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Key Management", path: "/key-management", icon: <Key className="h-5 w-5" /> },
    { name: "Secure Comms", path: "/secure-communication", icon: <Lock className="h-5 w-5" /> },
    { name: "Enterprise", path: "/enterprise", icon: <Building2 className="h-5 w-5" /> },
    { name: "Documentation", path: "/documentation", icon: <FileText className="h-5 w-5" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div 
          className={cn(
            "mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16",
            fullWidth ? "max-w-full" : "max-w-7xl"
          )}
        >
          <Link 
            to="/" 
            className="flex items-center gap-2"
            aria-label="TetraCryptPQC"
          >
            <Logo className="h-8 w-8" />
            <span className={cn(
              "font-medium text-lg transition-opacity duration-300",
              scrolled ? "opacity-100" : "opacity-0 sm:opacity-100"
            )}>
              TetraCryptPQC
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-secondary text-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-16 md:hidden animate-fade-in">
          <nav className="container py-8">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                      location.pathname === item.path
                        ? "bg-secondary text-foreground"
                        : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      
      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 pt-16 overflow-x-hidden",
        )}
      >
        {children}
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t">
        <div 
          className={cn(
            "mx-auto px-4 sm:px-6 lg:px-8",
            fullWidth ? "max-w-full" : "max-w-7xl"
          )}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">
                TetraCryptPQC • NIST FIPS 205/206 Compliant
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TetraCryptPQC. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

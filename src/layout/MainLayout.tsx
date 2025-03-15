
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
  BarChart3, 
  AlertTriangle,
  Database,
  Fingerprint,
  TerminalSquare
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
    { name: "NEXUS", path: "/tetracrypt-nexus", icon: <Database className="h-5 w-5" /> },
    { name: "DASHBOARD", path: "/dashboard", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "SECURE COMMS", path: "/secure-messaging", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "KEY MANAGEMENT", path: "/key-management", icon: <Key className="h-5 w-5" /> },
    { name: "QUANTUM VAULT", path: "/tetracrypt-wallet", icon: <Lock className="h-5 w-5" /> },
    { name: "RESEARCH", path: "/documentation", icon: <FileText className="h-5 w-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/80 dark:bg-slate-900/80 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.7)]" : "bg-transparent"
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
            <div className="relative">
              <Logo className="h-8 w-8" />
              <div className={cn(
                "absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent",
                !scrolled && "animate-pulse-subtle"
              )}></div>
            </div>
            <div className="flex flex-col items-start">
              <span className={cn(
                "font-medium text-sm transition-opacity duration-300 text-white",
                scrolled ? "opacity-100" : "opacity-0 sm:opacity-100"
              )}>
                TetraCryptPQC
              </span>
              <span className="text-[10px] uppercase font-mono text-accent/80">Baramay Station</span>
            </div>
          </Link>
          
          {/* Terminal Status */}
          <div className="hidden lg:flex items-center mr-4 text-xs font-mono text-accent/60">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent animate-pulse-subtle"></span>
            <span>[TERMINAL ID: BRM-{Math.floor(Math.random() * 9000) + 1000}]</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-xs font-medium transition-colors font-mono flex items-center",
                  location.pathname === item.path
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : "text-foreground/70 hover:text-accent hover:bg-accent/10"
                )}
              >
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.name}
              </Link>
            ))}
            
            <Button variant="outline" size="sm" className="ml-2 border-accent/30 text-accent hover:bg-accent/10">
              <Fingerprint className="h-4 w-4 mr-1" />
              <span className="text-xs font-mono">ACCESS</span>
            </Button>
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
        <div className="fixed inset-0 z-40 bg-black/95 pt-16 md:hidden animate-fade-in">
          <nav className="container py-8">
            <div className="flex items-center justify-between border-b border-accent/20 pb-4 mb-6">
              <div className="flex items-center text-xs font-mono text-accent/80">
                <TerminalSquare className="h-4 w-4 mr-2" />
                <span>TERMINAL ACCESS</span>
              </div>
              <div className="flex items-center text-xs font-mono text-red-500/80">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>CLEARANCE REQUIRED</span>
              </div>
            </div>
            
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors font-mono",
                      location.pathname === item.path
                        ? "bg-accent/20 text-accent border border-accent/30"
                        : "text-foreground/70 hover:text-accent hover:bg-accent/10"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
              
              <li>
                <Button variant="outline" className="w-full mt-4 border-accent/30 text-accent hover:bg-accent/10">
                  <Fingerprint className="h-4 w-4 mr-2" />
                  <span className="text-sm font-mono">SECURE ACCESS</span>
                </Button>
              </li>
            </ul>
            
            <div className="absolute bottom-8 left-0 right-0 px-8">
              <div className="p-4 border border-red-900/30 bg-red-950/20 rounded-md">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-xs font-mono text-red-400">SECURITY NOTICE</span>
                </div>
                <p className="text-xs text-gray-400">
                  Unauthorized access to this system will be prosecuted to the fullest extent under federal law.
                </p>
              </div>
            </div>
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
      <footer className="py-6 border-t border-accent/10 bg-black/40">
        <div 
          className={cn(
            "mx-auto px-4 sm:px-6 lg:px-8",
            fullWidth ? "max-w-full" : "max-w-7xl"
          )}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground font-mono">
                TetraCryptPQC • NIST FIPS 205/206 COMPLIANT
              </span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              <span className="text-accent/80">[CLASSIFICATION: </span>
              CLASSIFIED
              <span className="text-accent/80">]</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;

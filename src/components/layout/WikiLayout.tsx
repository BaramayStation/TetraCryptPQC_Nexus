
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MainLayout } from '@/layout/MainLayout';
import { 
  ChevronRight, 
  Home, 
  Shield, 
  Key, 
  Users, 
  Building2, 
  Cpu, 
  FileText,
  BarChart
} from 'lucide-react';

const WikiLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Extract category from URL if it exists
  const category = pathSegments.length > 1 ? pathSegments[1] : '';
  
  // Determine breadcrumb items based on path
  const breadcrumbs = [];
  breadcrumbs.push({ label: 'Wiki', path: '/wiki' });
  
  if (category) {
    const categoryMap: Record<string, { label: string; icon: React.ReactNode }> = {
      'cryptography': { 
        label: 'Cryptography', 
        icon: <Key className="h-4 w-4" /> 
      },
      'security': { 
        label: 'Security', 
        icon: <Shield className="h-4 w-4" /> 
      },
      'identity': { 
        label: 'Identity', 
        icon: <Users className="h-4 w-4" /> 
      },
      'enterprise': { 
        label: 'Enterprise', 
        icon: <Building2 className="h-4 w-4" /> 
      },
      'ai': { 
        label: 'AI', 
        icon: <Cpu className="h-4 w-4" /> 
      },
      'military': { 
        label: 'Military', 
        icon: <Shield className="h-4 w-4" /> 
      },
      'development': { 
        label: 'Development', 
        icon: <FileText className="h-4 w-4" /> 
      }
    };
    
    breadcrumbs.push({ 
      label: categoryMap[category]?.label || category, 
      path: `/wiki/${category}`,
      icon: categoryMap[category]?.icon
    });
    
    // Add page name to breadcrumbs if it exists
    if (pathSegments.length > 2) {
      const pageName = pathSegments[2]
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({ 
        label: pageName, 
        path: location.pathname 
      });
    }
  }
  
  return (
    <MainLayout>
      <div className="container py-6">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center text-sm text-muted-foreground mb-6">
          <Link to="/" className="flex items-center hover:text-foreground">
            <Home className="h-4 w-4 mr-1" />
            <span>Home</span>
          </Link>
          
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              <ChevronRight className="h-4 w-4 mx-2" />
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground flex items-center">
                  {crumb.icon && <span className="mr-1">{crumb.icon}</span>}
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.path} className="hover:text-foreground flex items-center">
                  {crumb.icon && <span className="mr-1">{crumb.icon}</span>}
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
        
        {/* Main content */}
        <div className="min-h-[calc(100vh-200px)]">
          {children}
        </div>
      </div>
    </MainLayout>
  );
};

export default WikiLayout;

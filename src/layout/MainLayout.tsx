
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainSidebar from '@/components/MainSidebar';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <MainSidebar />
      <main className="flex-1 overflow-x-hidden">
        {children ? children : <Outlet />}
      </main>
    </div>
  );
};

export default MainLayout;

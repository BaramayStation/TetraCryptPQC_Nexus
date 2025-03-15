
import React, { ReactNode } from 'react';
import { MainSidebar } from '@/components/MainSidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <MainSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

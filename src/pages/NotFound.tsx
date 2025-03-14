
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Home, ArrowLeft, RefreshCw } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <GlassContainer className="max-w-md w-full p-8 text-center" animation="blur-in">
          <div className="space-y-6">
            <div className="relative">
              <div className="text-[8rem] font-bold text-accent/10 select-none">404</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-3xl font-bold">Page Not Found</h1>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={goHome} className="gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
              <Button variant="outline" onClick={goBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button variant="ghost" onClick={() => window.location.reload()} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </GlassContainer>
      </div>
    </MainLayout>
  );
};

export default NotFound;

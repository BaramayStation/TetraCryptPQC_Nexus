
import { useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import DecentralizedCloud from "./pages/DecentralizedCloud";
import SecureMessaging from "./pages/SecureMessaging";
import UndergroundNetwork from "./pages/UndergroundNetwork";
import { SecureAuthProvider, useSecureAuth } from "./contexts/SecureAuthContext";

// Protected route wrapper component
const ProtectedRoute = ({ component: Component }: { component: React.ComponentType }) => {
  const { user, loading } = useSecureAuth();
  
  if (loading) {
    return <div>Loading authentication...</div>;
  }
  
  return user?.authenticated ? <Component /> : <Navigate to="/login" />;
};

const Routes = () => {
  const { user } = useSecureAuth();
  const isAuthenticated = user?.authenticated || false;

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute component={Dashboard} />,
    },
    {
      path: "/chat",
      element: <ProtectedRoute component={Chat} />,
    },
    {
      path: "/decentralized-cloud",
      element: <ProtectedRoute component={DecentralizedCloud} />,
    },
    {
      path: "/secure-messaging",
      element: <ProtectedRoute component={SecureMessaging} />,
    },
    {
      path: "/underground-network",
      element: <ProtectedRoute component={UndergroundNetwork} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <SecureAuthProvider>
      <Routes />
    </SecureAuthProvider>
  );
};

export default App;

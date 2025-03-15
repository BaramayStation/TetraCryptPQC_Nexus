
import { useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import DecentralizedCloud from "./pages/DecentralizedCloud";
import SecureMessaging from "./pages/SecureMessaging";
import UndergroundNetwork from "./pages/UndergroundNetwork";

const App = () => {
  // This is a placeholder - in a real implementation, you would use proper auth
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
      element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
    },
    {
      path: "/chat",
      element: isAuthenticated ? <Chat /> : <Navigate to="/login" />,
    },
    {
      path: "/decentralized-cloud",
      element: isAuthenticated ? <DecentralizedCloud /> : <Navigate to="/login" />,
    },
    {
      path: "/secure-messaging",
      element: isAuthenticated ? <SecureMessaging /> : <Navigate to="/login" />,
    },
    {
      path: "/underground-network",
      element: isAuthenticated ? <UndergroundNetwork /> : <Navigate to="/login" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

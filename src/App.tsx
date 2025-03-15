
import { useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import FileEncryption from "./pages/FileEncryption";
import KeyManagement from "./pages/KeyManagement";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SettingsPage from "./pages/SettingsPage";
import Chat from "./pages/Chat";
import DecentralizedCloud from "./pages/DecentralizedCloud";
import SecureMessaging from "./pages/SecureMessaging";
import { isUserAuthenticated } from "./lib/storage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated());

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login onLoginSuccess={() => setIsAuthenticated(true)} />,
    },
    {
      path: "/register",
      element: <Register onRegisterSuccess={() => setIsAuthenticated(true)} />,
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
    },
    {
      path: "/file-encryption",
      element: isAuthenticated ? <FileEncryption /> : <Navigate to="/login" />,
    },
    {
      path: "/key-management",
      element: isAuthenticated ? <KeyManagement /> : <Navigate to="/login" />,
    },
    {
      path: "/settings",
      element: isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />,
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
  ]);

  return <RouterProvider router={router} />;
};

export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Wiki from './pages/Wiki.tsx'
import Enterprise from './pages/Enterprise.tsx'
import PostQuantumSecurityImpl from './pages/PostQuantumSecurityImpl.tsx'
import DecentralizedID from './pages/DecentralizedID.tsx'
import AISecurity from './pages/AISecurity.tsx'
import Web3Integration from './pages/Web3Integration.tsx'
import WikiCategory from './pages/WikiCategory.tsx'
import WikiEnterprise from './pages/wiki/enterprise/EnterpriseCategory.tsx'
import CloudInfrastructure from './pages/wiki/enterprise/CloudInfrastructure.tsx'
import EnterpriseDeployment from './pages/wiki/enterprise/EnterpriseDeployment.tsx'
import ComplianceFrameworks from './pages/wiki/enterprise/ComplianceFrameworks.tsx'
import EnterpriseGovernance from './pages/wiki/enterprise/EnterpriseGovernance.tsx'
import SecureSupplyChain from './pages/wiki/enterprise/SecureSupplyChain.tsx'
import FailsafeContinuity from "./pages/FailsafeContinuity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/wiki",
    element: <Wiki />,
  },
  {
    path: "/wiki/:category",
    element: <WikiCategory />,
  },
  {
    path: "/enterprise",
    element: <Enterprise />,
  },
  {
    path: "/post-quantum-security",
    element: <PostQuantumSecurityImpl />,
  },
  {
    path: "/decentralized-id",
    element: <DecentralizedID />,
  },
  {
    path: "/ai-security",
    element: <AISecurity />,
  },
  {
    path: "/web3-integration",
    element: <Web3Integration />,
  },
  {
    path: "/wiki/enterprise",
    element: <WikiEnterprise />,
  },
  {
    path: "/wiki/enterprise/cloud-infrastructure",
    element: <CloudInfrastructure />,
  },
  {
    path: "/wiki/enterprise/deployment",
    element: <EnterpriseDeployment />,
  },
  {
    path: "/wiki/enterprise/compliance",
    element: <ComplianceFrameworks />,
  },
  {
    path: "/wiki/enterprise/governance",
    element: <EnterpriseGovernance />,
  },
  {
    path: "/wiki/enterprise/supply-chain",
    element: <SecureSupplyChain />,
  },
  {
    path: "/failsafe-continuity",
    element: <FailsafeContinuity />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

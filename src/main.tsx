
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
import FailsafeContinuity from "./pages/FailsafeContinuity.tsx"
import Helium3Economy from './pages/lunar/Helium3Economy.tsx'
import Helium3Mining from './pages/wiki/lunar/Helium3Mining.tsx'
import AsteroidMining from './pages/wiki/space/AsteroidMining.tsx'
import SpaceEconomy from './pages/wiki/space/SpaceEconomy.tsx'

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
    path: "/failsafe-continuity",
    element: <FailsafeContinuity />,
  },
  {
    path: "/lunar/helium3-economy",
    element: <Helium3Economy />,
  },
  {
    path: "/wiki/lunar/helium3mining",
    element: <Helium3Mining />,
  },
  {
    path: "/wiki/space/asteroidmining",
    element: <AsteroidMining />,
  },
  {
    path: "/wiki/space/spaceeconomy",
    element: <SpaceEconomy />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

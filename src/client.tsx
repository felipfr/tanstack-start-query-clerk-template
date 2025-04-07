/// <reference types="vinxi/types/client" />

import { scan } from 'react-scan'
// react-scan should be imported before any other react imports
import { initializeNewRelic } from '@/lib/config/logs'
import { StartClient } from '@tanstack/react-start'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { createRouter } from 'src/lib/config/router'

// Init react-scan if in development
// This is a development tool to scan the app for performance issues
if (process.env.NODE_ENV === 'development' && import.meta.env.VITE_REACT_SCAN_ENABLED === 'true') {
  scan({ enabled: true })
}

// Init New Relic if not in test or development
// This is a performance monitoring tool
initializeNewRelic()

// Initialize the router
// This is the main router for the app
const router = createRouter()

function Client() {
  return <StartClient router={router} />
}

// Hydrate the app
hydrateRoot(
  document,
  <StrictMode>
    <Client />
  </StrictMode>,
)

/// <reference types="vinxi/types/server" />

import { createClerkHandler } from '@clerk/tanstack-react-start/server'
import { getRouterManifest } from '@tanstack/react-start/router-manifest'
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createRouter } from 'src/lib/config/router'

export default createClerkHandler(
  createStartHandler({
    createRouter,
    getRouterManifest,
  }),
)(defaultStreamHandler)

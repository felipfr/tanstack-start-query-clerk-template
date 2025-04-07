import type { QueryClient } from '@tanstack/react-query'
import { ISessionClaims } from './auth'

export interface RouterContext {
  queryClient: QueryClient
  auth?: AuthContext
}

interface AuthContext {
  user?: ISessionClaims
  userId?: string
}

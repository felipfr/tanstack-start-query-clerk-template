import { ORGANIZATION_ROLES } from '@/lib/constants/roles'

export type AuthStateResponse = { auth: { userId: string; user: ISessionClaims } }
export type OrganizationRole = (typeof ORGANIZATION_ROLES)[keyof typeof ORGANIZATION_ROLES]

export interface ISessionClaims {
  azp: string
  email: string
  exp: number
  fullname?: string
  fva: [number, number]
  iat: number
  image: string
  iss: string
  jti: string
  nbf: number
  org_id?: string
  org_permissions?: string[]
  org_role?: string
  org_slug?: string
  metadata?: UserMetadata
  sid: string
  sub: string
  username?: string
}

interface UserMetadata {
  role?: OrganizationRole
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface CustomJwtSessionClaims {
    email: string
    fullname?: string
    image: string
    metadata?: UserMetadata
    username?: string
  }
}

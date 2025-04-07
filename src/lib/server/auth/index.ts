import { checkUserRoleSchema } from '@/lib/helpers/zod/check-user-role.schema'
import type { AuthStateResponse, OrganizationRole } from '@/lib/types/auth'
import { getAuth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'

export const authStateFn = createServerFn({ method: 'GET' }).handler(async () => {
  const webRequest = getVerifiedWebRequest()
  const { sessionClaims, userId } = await getAuth(webRequest)
  return { auth: { user: sessionClaims, userId } } as unknown as AuthStateResponse
})

export const checkRole = async (roles: OrganizationRole[]) => {
  return checkUserRoleFn({ data: { role: roles } })
}

const getVerifiedWebRequest = () => {
  const webRequest = getWebRequest()
  if (!webRequest) throw new Error('Web request is undefined')
  return webRequest
}

const checkUserRoleFn = createServerFn({ method: 'POST' })
  .validator(checkUserRoleSchema)
  .handler(async ({ data }) => {
    const webRequest = getVerifiedWebRequest()
    const { sessionClaims } = await getAuth(webRequest)
    const hasAnyRole =
      Array.isArray(data.role) && sessionClaims?.metadata?.role && data.role.includes(sessionClaims.metadata.role)
    return { valid: hasAnyRole }
  })

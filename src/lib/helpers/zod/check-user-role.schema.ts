import { ORGANIZATION_ROLES } from '@/lib/constants/roles'
import { z } from 'zod'

const roleValues = Object.values(ORGANIZATION_ROLES) as [string, ...string[]]

export const checkUserRoleSchema = z.object({
  role: z.array(z.enum(roleValues)).optional(),
})

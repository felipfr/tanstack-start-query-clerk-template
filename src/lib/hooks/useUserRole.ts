import { newRelicAgent } from '@/lib/config/logs'
import { checkRole } from '@/lib/server/auth'
import type { OrganizationRole } from '@/lib/types/auth'
import { useUser } from '@clerk/tanstack-react-start'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

type UseUserRoleProps = {
  role: OrganizationRole | OrganizationRole[]
}

/**
 * Custom hook to check if the user has any of the specified roles
 * @param props - Object containing role to check against
 * @param props.role - Single role or array of roles to check against
 * @returns Boolean indicating if the user has any of the specified roles
 */
export const useUserRole = ({ role }: UseUserRoleProps): boolean => {
  const { user } = useUser()
  const targetRoles = Array.isArray(role) ? role : [role]

  const { data = false } = useQuery({
    queryKey: ['UserRoles', targetRoles],
    queryFn: async () => {
      try {
        const { valid } = await checkRole(targetRoles)
        return valid
      } catch (error) {
        toast.error('Error checking user roles, contact support')
        newRelicAgent.current?.noticeError(error as Error, {
          attributes: {
            user: user?.primaryEmailAddress?.emailAddress,
            roles: targetRoles,
            error: (error as Error).message,
          },
        })
        return false
      }
    },
    staleTime: 5 * 60 * 1000,
  })

  return data
}

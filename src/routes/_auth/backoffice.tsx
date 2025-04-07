import { ORGANIZATION_ROLES } from '@/lib/constants/roles'
import { checkRole } from '@/lib/server/auth'
import { createFileRoute, Outlet, redirect, useLoaderData } from '@tanstack/react-router'
import { APP } from 'src/lib/constants/app'

export const Route = createFileRoute('/_auth/backoffice')({
  beforeLoad: async () => {
    const result = await checkRole([ORGANIZATION_ROLES.ADMIN])
    if (!result.valid) throw redirect({ to: '/' })
  },
  head: () => ({
    meta: [{ title: `Backoffice | ${APP.NAME}` }],
  }),
  component: BackofficeLayout,
})

function BackofficeLayout() {
  const { user } = useLoaderData({ from: '/_auth' })

  return (
    <div className="backoffice-layout">
      <div className="mb-4 rounded bg-red-100 p-2 text-red-800 dark:bg-red-900 dark:text-red-100">
        <h2 className="font-bold">Backoffice Area ({user.org_role} Role)</h2>
      </div>
      <Outlet />
    </div>
  )
}

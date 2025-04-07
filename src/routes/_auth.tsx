import { AppSidebar } from '@/components/shared/AppSidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (!context.auth?.userId) throw redirect({ to: '/login' })
  },
  loader: ({ context }) => {
    return { user: context.auth?.user }
  },
  component: AuthContainer,
})

function AuthContainer() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex-1 overflow-auto">
        <SidebarTrigger className="cursor-pointer" />
        <div className="p-2 md:p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

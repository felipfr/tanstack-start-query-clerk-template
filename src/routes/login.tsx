import Login from '@/components/pages/Login'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.auth?.userId) throw redirect({ to: '/' })
  },
  component: Login,
})

import '@/styles/app.css'
// The only reason to import css here is to make animations work
import { NotFound } from '@/components/pages/NotFound'
import { DefaultCatchBoundary } from '@/components/shared/DefaultCatchBoundary'
import { FullPageLoading } from '@/components/shared/FullPageLoading'
import { SidebarProvider } from '@/components/ui/sidebar'
import { APP } from '@/lib/constants/app'
import { authStateFn } from '@/lib/server/auth'
import type { RouterContext } from '@/lib/types/router-context'
import { seo } from '@/lib/utils'
import appCss from '@/styles/app.css?url'
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/tanstack-react-start'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HeadContent, Outlet, ReactNode, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    return authStateFn()
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({ title: `Home | ${APP.NAME}`, description: APP.DESCRIPTION }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
          <JotaiProvider>
            <ThemeProvider attribute="class">
              <ClerkLoading>
                <FullPageLoading size={60} />
              </ClerkLoading>
              <ClerkLoaded>
                <SidebarProvider>
                  <main className="bg-background text-foreground min-h-screen w-full antialiased">{children}</main>
                </SidebarProvider>
              </ClerkLoaded>
              {import.meta.env.MODE === 'development' && (
                <>
                  <ReactQueryDevtools buttonPosition="bottom-right" />
                  <TanStackRouterDevtools position="bottom-right" />
                </>
              )}
              <Scripts />
              <Toaster />
            </ThemeProvider>
          </JotaiProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

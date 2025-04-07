import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: (): boolean => !queryClient.isMutating(), // Don't refetch on reconnect if there are active mutations
    },
  },
})

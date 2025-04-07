import Help from '@/components/pages/Help'
import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { APP } from 'src/lib/constants/app'
import type { HelpItemType } from 'src/lib/types/help-item'

export const Route = createFileRoute('/_auth/_help/help')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(helpItemsQueryOptions),
  component: Help,
  head: () => ({
    meta: [{ title: `Help | ${APP.NAME}` }],
  }),
})

export const helpItemsQueryOptions = queryOptions({
  queryKey: ['helpItems'],
  queryFn: () => fetchHelpItems(),
})

const fetchHelpItems = async () => {
  const { data } = await axios.get<HelpItemType[]>('https://jsonplaceholder.typicode.com/posts', {})
  return data.slice(0, 10)
}

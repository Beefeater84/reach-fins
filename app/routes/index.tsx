import { Page } from '@/pages/home/page'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Finnish High Earners Explorer' },
    {
      name: 'description',
      content:
        'AI-powered search tool for Finnish high-income earners database. Ask questions about demographics, earnings, and tax data in plain English.',
    },
  ]
}

export default function Home() {
  return <Page />
}

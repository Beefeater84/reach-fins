import { Container } from '@/shared/components/Container'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

export const Stages = () => {
  const stages = [
    {
      title: 'Stage 1: Getting data, based on user question (Completed)',
      description:
        'You can ask any question. AI will understand it, generate an SQL query, retrieve data from the database, and present it in table format.',
    },
    {
      title: 'Stage 2: Manipulating data with AI. (Waiting for my spare time)',
      description:
        'For example, you can not only retrieve data but also group it and calculate specific values. This will require recursively sending requests to different agents and the database.',
    },
    {
      title:
        'Stage 3: Adding to the query data - data from the Internet (Waiting for my spare time)',
      description:
        'At this stage, integration with external data sources through APIs and web scraping is planned. AI will be able to enrich responses with current information from the internet.',
    },
  ]

  return (
    <Container className="pt-16 pb-16">
      <div className="prose prose-lg max-w-none prose-slate dark:prose-invert">
        <h2 id="development-stages">Development Stages</h2>
        <p>
          Our <strong>phased approach</strong> to building the AI-powered
          analytics platform, from data foundation to advanced features.
        </p>
      </div>

      <dl className="mt-12 divide-y divide-gray-900/10 dark:divide-white/10">
        {stages.map((stage) => (
          <Disclosure
            key={stage.title}
            as="div"
            className="py-6 first:pt-0 last:pb-0"
          >
            <dt>
              <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
                <span className="text-lg leading-7 font-semibold">
                  {stage.title}
                </span>
                <span className="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    aria-hidden="true"
                    className="size-6 group-data-open:hidden"
                  />
                  <MinusSmallIcon
                    aria-hidden="true"
                    className="size-6 group-not-data-open:hidden"
                  />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" className="mt-3 pr-12">
              <p className="text-base leading-7 text-gray-600 dark:text-gray-400">
                {stage.description}
              </p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </dl>
    </Container>
  )
}

import { getReachFinns } from '@/entities/reach-finns'
import { Container } from '@/shared/components/Container'
import { Pagination } from '@/shared/components/Pagination'
import { useQuery } from '@tanstack/react-query'

interface ShowResultsProps {
  isLoading: boolean
}

export const ShowResults = ({ isLoading }: ShowResultsProps) => {
  const { isError, data } = useQuery({
    //@ts-expect-error
    queryKey: ['getReachFinns'],
    queryFn: getReachFinns,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const SkeletonRow = () => (
    <tr className="w-full animate-pulse">
      <td className="py-4 pr-3 pl-4 sm:pl-0">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </td>
      <td className="px-3 py-4">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </td>
      <td className="px-3 py-4">
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </td>
      <td className="px-3 py-4">
        <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </td>
    </tr>
  )

  if (isError) {
    return <span>Error</span>
  }

  if (isLoading && !data) {
    return (
      <Container className="pt-5 pb-16 lg:pt-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </Container>
    )
  }

  return (
    <Container className="pt-5 pb-16 lg:pt-5">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 dark:text-white"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {data?.results?.map((person: any) => (
                  <tr key={person?.email}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 dark:text-white">
                      {person?.name}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {person?.title}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {person?.email}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {person?.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {data?.pagination && (
        <Pagination
          pagination={data.pagination}
          onPageChange={(direction) => {
            // TODO: Implement page change logic
            console.log('Page change:', direction)
          }}
        />
      )}
    </Container>
  )
}

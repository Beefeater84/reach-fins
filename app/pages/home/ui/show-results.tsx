import { getPaginationQuery, getReachFinns } from '@/entities/reach-finns'
import { Container } from '@/shared/components/Container'
import { Pagination } from '@/shared/components/Pagination'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface ShowResultsProps {
  isLoading: boolean
}

export const ShowResults = ({ isLoading }: ShowResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationData, setPaginationData] = useState<any>(null)
  const [isPaginationLoading, setIsPaginationLoading] = useState(false)

  const { isError, data } = useQuery({
    //@ts-expect-error
    queryKey: ['getReachFinns'],
    queryFn: getReachFinns,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const paginationMutation = useMutation({
    mutationFn: ({
      generatedQuery,
      page,
    }: {
      generatedQuery: string
      page: number
    }) => getPaginationQuery(generatedQuery, page),
    onMutate: () => {
      setIsPaginationLoading(true)
    },
    onSuccess: (paginatedData) => {
      // Update pagination data with new results
      if (paginatedData && data) {
        const updatedData = {
          ...data,
          results: paginatedData,
          pagination: {
            ...data.pagination,
            startIndex: (currentPage - 1) * data.pagination.currentPageSize,
            endIndex: Math.min(
              currentPage * data.pagination.currentPageSize - 1,
              data.pagination.totalCount - 1,
            ),
            hasNextPage:
              currentPage * data.pagination.currentPageSize <
              data.pagination.totalCount,
            hasPreviousPage: currentPage > 1,
          },
        }
        setPaginationData(updatedData)
      }
      setIsPaginationLoading(false)
    },
    onError: (error) => {
      console.error('Pagination error:', error)
      setIsPaginationLoading(false)
    },
  })

  // Reset pagination when new data is received
  useEffect(() => {
    if (data) {
      setCurrentPage(1)
      setPaginationData(null)
    }
  }, [data])

  const handlePageChange = (direction: 'next' | 'previous') => {
    if (!data?.generatedQuery) return

    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1
    setCurrentPage(newPage)

    paginationMutation.mutate({
      generatedQuery: data.generatedQuery,
      page: newPage,
    })
  } // Use pagination data if available, otherwise use original data
  const displayData = paginationData || data

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

  if ((isLoading || isPaginationLoading) && !displayData) {
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
                {displayData?.results?.map((person: any) => (
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

      {displayData?.pagination && (
        <Pagination
          pagination={displayData.pagination}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  )
}

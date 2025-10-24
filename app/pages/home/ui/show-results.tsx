import { getPaginationQuery, getReachFinns } from '@/entities/reach-finns'
import { Container } from '@/shared/components/Container'
import { Pagination } from '@/shared/components/Pagination'
import type { ColumnConfig } from '@/shared/utils/columnConfig'
import {
  getAvailableColumns,
  getVisibleColumns,
} from '@/shared/utils/columnConfig'
import { formatValue } from '@/shared/utils/dataFormatters'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

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
  }

  const handlePageSelect = (page: number) => {
    if (!data?.generatedQuery) return

    setCurrentPage(page)

    paginationMutation.mutate({
      generatedQuery: data.generatedQuery,
      page: page,
    })
  }

  // Use pagination data if available, otherwise use original data
  const displayData = paginationData || data

  // Dynamically determine available and visible columns based on actual data
  const availableColumns = useMemo(() => {
    if (!displayData?.results || displayData.results.length === 0) {
      return []
    }
    const columns = getAvailableColumns(displayData.results)

    // Debug: Log available columns in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Available columns detected:',
        columns.map((col) => col.field),
      )
    }

    return columns
  }, [displayData?.results])

  // Get visible columns based on available columns
  const visibleColumns = useMemo(() => {
    // For now, show all available columns. Responsive logic can be added later with proper hooks
    return getVisibleColumns(availableColumns)
  }, [availableColumns])

  const SkeletonRow = ({ columns }: { columns: ColumnConfig[] }) => (
    <tr className="w-full animate-pulse">
      {columns.map((column, index) => (
        <td
          key={column.field}
          className={index === 0 ? 'py-4 pr-3 pl-4 sm:pl-0' : 'px-3 py-4'}
        >
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
        </td>
      ))}
    </tr>
  )

  if (isError) {
    return <span>Error</span>
  }

  if ((isLoading || isPaginationLoading) && !displayData) {
    // Use default columns for skeleton loading based on most important fields
    const defaultSkeletonColumns = getAvailableColumns([
      {
        name: 'Loading...',
        earnings_total: 0,
        rank: 1,
        living_province: 'Loading...',
      },
    ])

    return (
      <Container className="pb-16">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonRow key={i} columns={defaultSkeletonColumns} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="pb-16">
      {/* Results Summary */}
      {displayData && (
        <div className="mt-6 mb-8">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/50">
            {/* Total Results Count */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {displayData.totalCount?.toLocaleString() ||
                        displayData.count?.toLocaleString() ||
                        0}
                    </span>{' '}
                    <span className="text-base">
                      {(displayData.totalCount || displayData.count || 0) === 1
                        ? 'person found'
                        : 'people found'}
                    </span>
                  </span>
                </div>
              </div>

              {/* Current Page Range */}
              {displayData.pagination && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing{' '}
                  {(displayData.pagination.startIndex + 1).toLocaleString()}-
                  {(displayData.pagination.endIndex + 1).toLocaleString()} of{' '}
                  {displayData.pagination.totalCount.toLocaleString()}
                </div>
              )}
            </div>

            {/* Original Query and Additional Info */}
            {displayData.originalQuery && (
              <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-600">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Query:</span> "
                    {displayData.originalQuery}"
                  </p>
                  {displayData.status === 'completed' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Search completed
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
              <thead>
                <tr>
                  {visibleColumns.map((column, index) => (
                    <th
                      key={column.field}
                      scope="col"
                      className={`py-3.5 text-sm font-semibold text-gray-900 dark:text-white ${
                        index === 0 ? 'pr-3 pl-4 sm:pl-0' : 'px-3'
                      } ${column.headerClassName || ''}`}
                    >
                      {column.displayName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {displayData?.results?.map((person: any, rowIndex: number) => (
                  <tr key={person?.id || person?.name || rowIndex}>
                    {visibleColumns.map((column, cellIndex) => (
                      <td
                        key={column.field}
                        className={`py-4 text-sm whitespace-nowrap ${
                          cellIndex === 0 ? 'pr-3 pl-4 sm:pl-0' : 'px-3'
                        } ${column.cellClassName || ''}`}
                      >
                        {formatValue(person[column.field], column.dataType)}
                      </td>
                    ))}
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
          onPageSelect={handlePageSelect}
        />
      )}
    </Container>
  )
}

/**
 * Dynamic column configuration system based on database schema
 * Maps database fields to display properties and formatting rules
 */

export type DataType =
  | 'text'
  | 'number'
  | 'currency'
  | 'percentage'
  | 'year'
  | 'rank'

export interface ColumnConfig {
  /** Database field name */
  field: string
  /** Human-readable display name */
  displayName: string
  /** Data type for formatting */
  dataType: DataType
  /** Priority for responsive display (1 = highest priority) */
  priority: number
  /** Whether to show this column by default */
  defaultVisible: boolean
  /** CSS classes for the column header */
  headerClassName?: string
  /** CSS classes for the cell content */
  cellClassName?: string
}

/**
 * Complete column configuration based on the database schema
 * from agent.md - table: people
 */
export const COLUMN_CONFIGS: Record<string, ColumnConfig> = {
  name: {
    field: 'name',
    displayName: 'Name',
    dataType: 'text',
    priority: 1,
    defaultVisible: true,
    headerClassName: 'text-left',
    cellClassName: 'font-medium text-gray-900 dark:text-white',
  },
  living_province: {
    field: 'living_province',
    displayName: 'Province',
    dataType: 'text',
    priority: 3,
    defaultVisible: true,
    headerClassName: 'text-left',
    cellClassName: 'text-gray-500 dark:text-gray-400',
  },
  earnings_total: {
    field: 'earnings_total',
    displayName: 'Total Earnings',
    dataType: 'currency',
    priority: 2,
    defaultVisible: true,
    headerClassName: 'text-right',
    cellClassName: 'text-right font-medium text-gray-900 dark:text-white',
  },
  earned_income: {
    field: 'earned_income',
    displayName: 'Earned Income',
    dataType: 'currency',
    priority: 6,
    defaultVisible: true,
    headerClassName: 'text-right',
    cellClassName: 'text-right text-gray-500 dark:text-gray-400',
  },
  capital_income: {
    field: 'capital_income',
    displayName: 'Capital Income',
    dataType: 'currency',
    priority: 7,
    defaultVisible: true,
    headerClassName: 'text-right',
    cellClassName: 'text-right text-gray-500 dark:text-gray-400',
  },
  tax_rate: {
    field: 'tax_rate',
    displayName: 'Tax Rate',
    dataType: 'percentage',
    priority: 8,
    defaultVisible: true,
    headerClassName: 'text-right',
    cellClassName: 'text-right text-gray-500 dark:text-gray-400',
  },
  income_after_tax: {
    field: 'income_after_tax',
    displayName: 'After-Tax Income',
    dataType: 'currency',
    priority: 9,
    defaultVisible: true,
    headerClassName: 'text-right',
    cellClassName: 'text-right text-gray-500 dark:text-gray-400',
  },
  remaining_tax: {
    field: 'remaining_tax',
    displayName: 'Remaining Tax',
    dataType: 'text',
    priority: 10,
    defaultVisible: true,
    headerClassName: 'text-left',
    cellClassName: 'text-gray-500 dark:text-gray-400',
  },
  refunds: {
    field: 'refunds',
    displayName: 'Refunds',
    dataType: 'currency',
    priority: 11,
    defaultVisible: true,
    headerClassName: 'text-right',
    cellClassName: 'text-right text-gray-500 dark:text-gray-400',
  },
  birth_year: {
    field: 'birth_year',
    displayName: 'Birth Year',
    dataType: 'year',
    priority: 4,
    defaultVisible: true,
    headerClassName: 'text-center',
    cellClassName: 'text-center text-gray-500 dark:text-gray-400',
  },
  rank: {
    field: 'rank',
    displayName: 'Overall Rank',
    dataType: 'rank',
    priority: 5,
    defaultVisible: true,
    headerClassName: 'text-center',
    cellClassName: 'text-center font-medium text-gray-900 dark:text-white',
  },
  province_rank: {
    field: 'province_rank',
    displayName: 'Province Rank',
    dataType: 'rank',
    priority: 12,
    defaultVisible: true,
    headerClassName: 'text-center',
    cellClassName: 'text-center text-gray-500 dark:text-gray-400',
  },
}

/**
 * Get available columns based on actual data
 * @param data - Array of data objects
 * @returns Array of column configs that have data
 */
export const getAvailableColumns = (data: any[]): ColumnConfig[] => {
  if (!data || data.length === 0) return []

  // Get all keys from the first data item
  const firstItem = data[0]
  const availableFields = Object.keys(firstItem || {})

  // Filter column configs to only include fields that exist in the data
  const availableColumns = availableFields
    .map((field) => COLUMN_CONFIGS[field])
    .filter(Boolean) // Remove undefined configs
    .sort((a, b) => a.priority - b.priority) // Sort by priority

  return availableColumns
}

/**
 * Get visible columns based on screen size and priority
 * @param availableColumns - All available columns
 * @param maxColumns - Maximum number of columns to show (responsive)
 * @returns Array of columns to display
 */
export const getVisibleColumns = (
  availableColumns: ColumnConfig[],
  maxColumns?: number,
): ColumnConfig[] => {
  // Start with default visible columns
  let visibleColumns = availableColumns.filter((col) => col.defaultVisible)

  // If we need to limit columns for responsive design
  if (maxColumns && visibleColumns.length > maxColumns) {
    visibleColumns = visibleColumns.slice(0, maxColumns)
  }

  return visibleColumns
}

/**
 * Check if a value exists and is not empty
 */
export const hasValue = (value: any): boolean => {
  return value !== null && value !== undefined && value !== '' && value !== 0
}

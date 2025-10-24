/**
 * Data formatting utilities for different data types
 * Handles currency, percentages, years, and other data formatting needs
 */

import type { DataType } from './columnConfig'

/**
 * Format currency values (assuming EUR currency for Finnish data)
 * @param value - Numeric value to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number | string | null): string => {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  const numericValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numericValue)) {
    return '-'
  }

  // Format as EUR currency
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue)
}

/**
 * Format percentage values
 * @param value - Decimal value (e.g., 0.25 for 25%)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number | string | null): string => {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  const numericValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numericValue)) {
    return '-'
  }

  // Convert decimal to percentage and format
  return new Intl.NumberFormat('fi-FI', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(numericValue)
}

/**
 * Format numeric values with thousand separators
 * @param value - Numeric value to format
 * @returns Formatted number string
 */
export const formatNumber = (value: number | string | null): string => {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  const numericValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numericValue)) {
    return '-'
  }

  return new Intl.NumberFormat('fi-FI').format(numericValue)
}

/**
 * Format rank values with ordinal suffixes
 * @param value - Rank number
 * @returns Formatted rank string (e.g., "1st", "2nd", "3rd")
 */
export const formatRank = (value: number | string | null): string => {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  const numericValue = typeof value === 'string' ? parseInt(value) : value

  if (isNaN(numericValue) || numericValue <= 0) {
    return '-'
  }

  // Add ordinal suffix
  const suffix = getOrdinalSuffix(numericValue)
  return `${formatNumber(numericValue)}${suffix}`
}

/**
 * Get ordinal suffix for a number
 * @param num - Number to get suffix for
 * @returns Ordinal suffix ("st", "nd", "rd", "th")
 */
const getOrdinalSuffix = (num: number): string => {
  const lastDigit = num % 10
  const lastTwoDigits = num % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th'
  }

  switch (lastDigit) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

/**
 * Format year values
 * @param value - Year value
 * @returns Formatted year string
 */
export const formatYear = (value: number | string | null): string => {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  const numericValue = typeof value === 'string' ? parseInt(value) : value

  if (
    isNaN(numericValue) ||
    numericValue < 1900 ||
    numericValue > new Date().getFullYear()
  ) {
    return '-'
  }

  return numericValue.toString()
}

/**
 * Format text values with proper handling of empty/null values
 * @param value - Text value to format
 * @returns Formatted text string
 */
export const formatText = (value: string | null): string => {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  return value.toString().trim()
}

/**
 * Main formatter function that routes to appropriate formatter based on data type
 * @param value - Value to format
 * @param dataType - Type of data formatting to apply
 * @returns Formatted string
 */
export const formatValue = (value: any, dataType: DataType): string => {
  switch (dataType) {
    case 'currency':
      return formatCurrency(value)
    case 'percentage':
      return formatPercentage(value)
    case 'number':
      return formatNumber(value)
    case 'rank':
      return formatRank(value)
    case 'year':
      return formatYear(value)
    case 'text':
    default:
      return formatText(value)
  }
}

/**
 * Check if a value should be considered "empty" for display purposes
 * @param value - Value to check
 * @returns True if value should be considered empty
 */
export const isEmpty = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (typeof value === 'number' && isNaN(value))
  )
}
